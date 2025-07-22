import React, { useState } from "react";

export default function App() {
  const [isSeries, setIsSeries] = useState(false);
  const [externalId, setExternalId] = useState("");
  const [metadata, setMetadata] = useState({
    guid: "", title: "", originalTitle: "", tinyDescription: "", shortDescription: "", description: "",
    year: "", distributor: "", ratings: "", duration: "", publishDate: "", endPublishDate: "", episode: ""
  });
  const [seriesMetadata, setSeriesMetadata] = useState({
    guid: "", title: "", originalTitle: "", tinyDescription: "", shortDescription: "", description: ""
  });
  const [season, setSeason] = useState({ number: "" });
  const [output, setOutput] = useState("");
  const [mediaFile, setMediaFile] = useState({ fileName: "", role: "", transcodingId: "" });
  const [category, setCategory] = useState({ type: "", name: "", language: "", translation: "" });
  const [person, setPerson] = useState({ firstName: "", lastName: "", role: "" });
  const [image, setImage] = useState({ fileName: "", role: "" });
  const [translation, setTranslation] = useState({ field: "", value: "", language: "" });
  const [collection, setCollection] = useState("");

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
      externalId: externalId,
      metadata: {
        ...metadata,
        categories: [
          {
            type: category.type,
            name: category.name,
            translations: [
              {
                field: "name",
                value: category.translation,
                language: category.language
              }
            ]
          }
        ],
        people: [
          {
            firstName: person.firstName,
            lastName: person.lastName,
            role: person.role
          }
        ],
        images: [
          {
            fileName: image.fileName,
            role: image.role
          }
        ],
        translations: [
          {
            field: translation.field,
            value: translation.value,
            language: translation.language
          }
        ],
        collections: [collection]
      },
      series: isSeries ? {
        externalId: seriesMetadata.guid,
        seasonNumber: season.number,
        episodeNumber: metadata.episode
      } : {},
      season: isSeries ? {
        externalId: seriesMetadata.guid,
        seasonNumber: season.number
      } : {},
      mediaFiles: [
        {
          fileName: mediaFile.fileName,
          role: mediaFile.role,
          transcodingId: mediaFile.transcodingId
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

      <h2>External ID</h2>
      <input
        name="externalId"
        value={externalId}
        onChange={(e) => setExternalId(e.target.value)}
        placeholder="External ID"
        style={{ width: "100%", margin: "5px 0", padding: "8px" }}
      />

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

      <h2>Category</h2>
      {Object.keys(category).map(key => (
        <input
          key={key}
          name={key}
          value={category[key]}
          onChange={(e) => handleChange(e, setCategory)}
          placeholder={key}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
      ))}

      <h2>People</h2>
      {Object.keys(person).map(key => (
        <input
          key={key}
          name={key}
          value={person[key]}
          onChange={(e) => handleChange(e, setPerson)}
          placeholder={key}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
      ))}

      <h2>Images</h2>
      {Object.keys(image).map(key => (
        <input
          key={key}
          name={key}
          value={image[key]}
          onChange={(e) => handleChange(e, setImage)}
          placeholder={key}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
      ))}

      <h2>Translations</h2>
      {Object.keys(translation).map(key => (
        <input
          key={key}
          name={key}
          value={translation[key]}
          onChange={(e) => handleChange(e, setTranslation)}
          placeholder={key}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
      ))}

      <h2>Collections</h2>
      <input
        name="collection"
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
        placeholder="Collection"
        style={{ width: "100%", margin: "5px 0", padding: "8px" }}
      />

      <h2>Media File</h2>
      {Object.keys(mediaFile).map(key => (
        <input
          key={key}
          name={key}
          value={mediaFile[key]}
          onChange={(e) => handleChange(e, setMediaFile)}
          placeholder={key}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
      ))}

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
