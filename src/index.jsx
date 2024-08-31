/* eslint-disable no-unused-vars */
import React, { StrictMode } from "react";

import { ColorModeScript } from "@chakra-ui/react";

import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ColorModeScript />

    <App />
  </StrictMode>
);
