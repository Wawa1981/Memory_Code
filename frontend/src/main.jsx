import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";   // ← Change ici si nécessaire
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);