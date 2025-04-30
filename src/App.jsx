import React, { useState } from "react";

export default function App() {
  const [isSeries, setIsSeries] = useState(false);
  const [metadata, setMetadata] = useState({
    guid: "", title: "", originalTitle: "", tinyDescription: "", shortDescription: "", description: "",
    year: "", distributor: "", ratings: "", duration: "", publishDate: "", endPublishDate: "", episode: ""
  });
  const [seriesMetadata, setSeriesMetadata] = useState({
    guid: "", title: "", originalTitle: "", tinyDescription: "", shortDescription: "", description: ""
  });
  const [season, setSeason] = useState({ number: "" });
  const [output, setOutput] = useState("");

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const parseXML = (xmlText) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const asset = xml.querySelector("VideoAsset[ID]:not([ID*='TRAILER'])");

    if (asset) {
      const title = asset.querySelector("Title")?.textContent || "";
      const originalTitle = asset.querySelector("ExtraField[Name='originalVersionTitle']")?.getAttribute("Value") || "";
      const shortDesc = asset.querySelector("ShortDescription")?.textContent || "";
      const description = asset.querySelector("Description")?.textContent || "";
      const year = asset.querySelector("Year")?.textContent || "";
      const ratings = asset.querySelector("ParentalRating")?.textContent || "";
      const duration = asset.querySelector("ExtraField[Name='ApproximateDuration']")?.getAttribute("Value") || "";
      const publishDate = asset.querySelector("VODService")?.getAttribute("PublishDate") || "";
      const endPublishDate = asset.querySelector("VODService")?.getAttribute("RemovalDate") || "";

      setMetadata(prev => ({
        ...prev,
        guid: asset.getAttribute("ID"),
        title,
        originalTitle,
        shortDescription: shortDesc,
        description,
        year,
        ratings,
        duration,
        publishDate,
        endPublishDate
      }));
    }
  };

  const handleXMLUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => parseXML(reader.result);
    reader.readAsText(file);
  };

  const generateJSON = () => {
    const json = {
      movies: [
        {
          language: "",
          metadata: {
            ...metadata,
            categories: [],
            people: [],
            images: [],
            translations: [],
            collections: []
          },
          series: isSeries ? {
            ...seriesMetadata,
            categories: [],
            people: [],
            images: [],
            translations: []
          } : {},
          season: isSeries ? { ...season } : {},
          mediaFiles: []
        }
      ]
    };
    setOutput(JSON.stringify(json, null, 2));
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isSeries ? "series.json" : "movie.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "900px", margin: "auto" }}>
      <h1>Movie / Series JSON Generator</h1>
      <input type="file" accept=".xml" onChange={handleXMLUpload} style={{ marginBottom: "10px" }} />
      <br />
      <label>
        <input type="checkbox" checked={isSeries} onChange={(e) => setIsSeries(e.target.checked)} />
        {" "}This is an episode of a series
      </label>

      <h2>Metadata</h2>
      {Object.keys(metadata).map(key => (
        <input
          key={key}
          name={key}
          value={metadata[key]}
          onChange={(e) => handleChange(e, setMetadata)}
          placeholder={key}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
      ))}

      {isSeries && (
        <>
          <h2>Series Metadata</h2>
          {Object.keys(seriesMetadata).map(key => (
            <input
              key={key}
              name={key}
              value={seriesMetadata[key]}
              onChange={(e) => handleChange(e, setSeriesMetadata)}
              placeholder={key}
              style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />
          ))}

          <h2>Season Metadata</h2>
          <input
            name="number"
            value={season.number}
            onChange={(e) => handleChange(e, setSeason)}
            placeholder="Season number"
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </>
      )}

      <button onClick={generateJSON} style={{ marginTop: "10px", padding: "10px 20px" }}>Generate JSON</button>
      {output && (
        <button onClick={downloadJSON} style={{ marginLeft: "10px", padding: "10px 20px" }}>Download JSON</button>
      )}

      <textarea
        value={output}
        readOnly
        rows="30"
        style={{ width: "100%", marginTop: "20px", padding: "10px", fontFamily: "monospace" }}
      />
    </div>
  );
}
