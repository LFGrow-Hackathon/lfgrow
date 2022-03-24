import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import App from "@/App.jsx";
import { MoralisProvider } from "react-moralis";

/* ------------------------------- 
Setup Moralis server 
---------------------------------*/
const APP_ID = import.meta.env.VITE_REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = import.meta.env.VITE_REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  if (!APP_ID || !SERVER_URL) {
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  }

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);
