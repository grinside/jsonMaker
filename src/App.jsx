import React, { useState } from "react";

export default function App() {
  const [isSeries, setIsSeries] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [guid, setGuid] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("en");
  const [seriesGuid, setSeriesGuid] = useState("");
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [output, setOutput] = useState("");

  const generateJSON = () => {
    const json = {
      movies: [
        {
          language,
          metadata: {
            guid,
            title: movieTitle,
            originalTitle: movieTitle,
            tinyDescription: "",
            shortDescription: "",
            description: "",
            year,
            distributor: "",
            ratings: "",
            duration,
            publishDate: "",
            endPublishDate: "",
            episode: episodeNumber,
            categories: [],
            people: [],
            images: [],
            translations: [],
            collections: []
          },
          series: isSeries ? {
            guid: seriesGuid,
            title: "",
            originalTitle: "",
            tinyDescription: "",
            shortDescription: "",
            description: "",
            categories: [],
            people: [],
            images: [],
            translations: []
          } : null,
          season: isSeries ? { number: seasonNumber } : null,
          mediaFiles: []
        }
      ]
    };
    setOutput(JSON.stringify(json, null, 2));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Movie/Series JSON Generator</h1>
      <label>
        <input type="checkbox" checked={isSeries} onChange={(e) => setIsSeries(e.target.checked)} />
        {' '}Is part of a series?
      </label>
      <br />
      <input placeholder="Movie Title" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
      <input placeholder="GUID" value={guid} onChange={(e) => setGuid(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
      <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
      <input placeholder="Duration (seconds)" value={duration} onChange={(e) => setDuration(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
      <input placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
      {isSeries && (
        <>
          <input placeholder="Series GUID" value={seriesGuid} onChange={(e) => setSeriesGuid(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
          <input placeholder="Season Number" value={seasonNumber} onChange={(e) => setSeasonNumber(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
          <input placeholder="Episode Number" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} style={{ margin: '5px', padding: '5px', width: '100%' }} />
        </>
      )}
      <br />
      <button onClick={generateJSON} style={{ marginTop: '10px', padding: '10px 20px' }}>Generate JSON</button>
      <textarea value={output} readOnly rows="20" style={{ width: '100%', marginTop: '20px', padding: '10px' }} />
    </div>
  );
}
