import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { OrganizationProvider } from "./context/OrganizationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OrganizationProvider>
        <App />
      </OrganizationProvider>
    </BrowserRouter>
  </React.StrictMode>
);