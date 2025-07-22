import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function MovieImportGenerator() {
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
      externalId: "",
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
        categories: [
          {
            type: "",
            name: "",
            translations: [
              {
                field: "name",
                value: "",
                language: ""
              }
            ]
          }
        ],
        people: [
          {
            firstName: "",
            lastName: "",
            role: ""
          }
        ],
        images: [
          {
            fileName: "",
            role: ""
          }
        ],
        translations: [
          {
            field: "",
            value: "",
            language: ""
          }
        ],
        collections: [
          ""
        ]
      },
      series: isSeries ? {
        externalId: seriesGuid,
        seasonNumber,
        episodeNumber
      } : {
        externalId: "",
        seasonNumber: "",
        episodeNumber: ""
      },
      season: isSeries ? {
        externalId: seriesGuid,
        seasonNumber
      } : {
        externalId: "",
        seasonNumber: ""
      },
      mediaFiles: [
        {
          fileName: "",
          role: "",
          transcodingId: ""
        }
      ]
    };

    setOutput(JSON.stringify(json, null, 2));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Movie/Series JSON Generator</h1>
      <div>
        <label>
          <input type="checkbox" checked={isSeries} onChange={e => setIsSeries(e.target.checked)} />
          {' '}Is part of a series?
        </label>
      </div>
      <Input placeholder="Movie Title" value={movieTitle} onChange={e => setMovieTitle(e.target.value)} />
      <Input placeholder="GUID" value={guid} onChange={e => setGuid(e.target.value)} />
      <Input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <Input placeholder="Duration (seconds)" value={duration} onChange={e => setDuration(e.target.value)} />
      <Input placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} />
      {isSeries && (
        <>
          <Input placeholder="Series GUID" value={seriesGuid} onChange={e => setSeriesGuid(e.target.value)} />
          <Input placeholder="Season Number" value={seasonNumber} onChange={e => setSeasonNumber(e.target.value)} />
          <Input placeholder="Episode Number" value={episodeNumber} onChange={e => setEpisodeNumber(e.target.value)} />
        </>
      )}
      <Button onClick={generateJSON}>Generate JSON</Button>
      <Textarea value={output} readOnly rows="20" />
    </div>
  );
}

