import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Card, CardContent } from "./components/ui/card";
import { Switch } from "./components/ui/switch";

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
    const baseMetadata = {
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
    };

    const json = {
      movies: [
        {
          language,
          metadata: baseMetadata,
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
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Movie/Series Import JSON Generator</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center space-x-2">
            <Switch checked={isSeries} onCheckedChange={setIsSeries} />
            <span>{isSeries ? "Episode of a Series" : "Standalone Movie"}</span>
          </div>
          <Input placeholder="Movie Title" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
          <Input placeholder="GUID" value={guid} onChange={(e) => setGuid(e.target.value)} />
          <Input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
          <Input placeholder="Duration (seconds)" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <Input placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
          {isSeries && (
            <>
              <Input placeholder="Series GUID" value={seriesGuid} onChange={(e) => setSeriesGuid(e.target.value)} />
              <Input placeholder="Season Number" value={seasonNumber} onChange={(e) => setSeasonNumber(e.target.value)} />
              <Input placeholder="Episode Number" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} />
            </>
          )}
          <Button onClick={generateJSON}>Generate JSON</Button>
        </CardContent>
      </Card>
      <Textarea value={output} className="w-full h-96" readOnly />
    </div>
  );
}
