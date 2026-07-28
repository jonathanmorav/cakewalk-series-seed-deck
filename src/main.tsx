import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./design-system/styles.css";
import "./styles/deck.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
