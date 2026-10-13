import React from "react";
import ReactDOM from "react-dom/client";
import Ledger from "./Ledger";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Ledger />
  </React.StrictMode>,
);
