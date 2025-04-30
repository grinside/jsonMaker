import React, { useState } from "react";

export default function App() {
  const [isSeries, setIsSeries] = useState(false);
  const [output, setOutput] = useState("");

  const emptyMovie = {
    language: "",
    metadata: {
      guid: "",
      title: "",
      originalTitle: "",
      tinyDescription: "",
      shortDescription: "",
      description: "",
      year: "",
      distributor: "",
      ratings: "",
      duration: "",
      publishDate: "",
      endPublishDate: "",
      episode: "",
      categories: [],
      people: [],
      images: [],
      translations: [],
      collections: []
    },
    series: {},
    season: {},
    mediaFiles: []
  };

  const emptySeries = {
    language: "",
    metadata: {
      guid: "",
      title: "",
      originalTitle: "",
      tinyDescription: "",
      shortDescription: "",
      description: "",
      year: "",
      distributor: "",
      ratings: "",
      duration: "",
      publishDate: "",
      endPublishDate: "",
      episode: "",
      categories: [],
      people: [],
      images: [],
      translations: [],
      collections: []
    },
    series: {
      guid: "",
      title: "",
      originalTitle: "",
      tinyDescription: "",
      shortDescription: "",
      description: "",
      categories: [],
      people: [],
      images: [],
      translations: []
    },
    season: {
      number: ""
    },
    mediaFiles: []
  };

  const generateJSON = () => {
    const json = {
      movies: [isSeries ? emptySeries : emptyMovie]
    };
    const jsonStr = JSON.stringify(json, null, 2);
    setOutput(jsonStr);
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isSeries ? "series-template.json" : "movie-template.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Generate Empty JSON Template</h1>
      <label>
        <input type="checkbox" checked={isSeries} onChange={(e) => setIsSeries(e.target.checked)} />
        {" "}Generate a Series Episode JSON?
      </label>
      <br />
      <button onClick={generateJSON} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Generate JSON
      </button>
      {output && (
        <button onClick={downloadJSON} style={{ marginLeft: "10px", padding: "10px 20px" }}>
          Download JSON
        </button>
      )}
      <textarea value={output} readOnly rows="40" style={{ width: "100%", marginTop: "20px", padding: "10px" }} />
    </div>
  );
}
