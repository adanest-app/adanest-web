import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource-variable/inter";
import "@fontsource/pacifico";
import "./styles/reset.css";
import "./styles/index.css";
import "./styles/button.css";
import "./styles/input.css";
import "react-toastify/dist/ReactToastify.min.css";
import TimeAgo from "javascript-time-ago";
import id from "javascript-time-ago/locale/id.json";

TimeAgo.addDefaultLocale(id);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
