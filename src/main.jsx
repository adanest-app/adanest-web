import App from "./App.jsx";
import "./styles/button.css";
import "./styles/index.css";
import "./styles/input.css";
import "./styles/reset.css";
import "./styles/responsive.css";
import "@fontsource-variable/inter";
import "@fontsource/pacifico";
import TimeAgo from "javascript-time-ago";
import id from "javascript-time-ago/locale/id.json";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";

TimeAgo.addDefaultLocale(id);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
