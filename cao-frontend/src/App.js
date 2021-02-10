import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import MenuAppBar from "./Components/MenuAppBar";
import MapChart from "./Components/MapChart";
import ReactTooltip from "react-tooltip";

function App() {
  const [content, setContent] = useState("");

  return (
    <div>
      <MenuAppBar></MenuAppBar>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
