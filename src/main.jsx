import React from "react";
import ReactDOM from "react-dom/client";
import MovieImportGenerator from "./MovieImportGenerator";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MovieImportGenerator />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
