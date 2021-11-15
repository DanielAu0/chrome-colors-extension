import "./style/style.css";

import { ChromeMessage, Sender } from "./types";

import Button from "./components/Button";
import Header from "./components/Header";
import React from "react";
import ToggleButton from "./components/ToggleButton";

function App() {
  const [color, setColor] = React.useState("");
  const [responseFromContent, setResponseFromContent] = React.useState("");

  React.useEffect(() => {
    colorChangeMessage(color);
  });

  const colorChangeMessage = (color: String) => {
    const message: ChromeMessage = {
      from: Sender.React,
      color: color,
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id || 0;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response);
        });
      });
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <ToggleButton />

        <div className="btn-themes">
          <Button
            color={"#889200"}
            text={"Theme 1"}
            onClick={() => setColor("#889200")} 
          />
          <Button
            color={"#76b08e"}
            text={"Theme 2"}
            onClick={() => setColor("#76b08e")} 
          />
          <Button
            color={"gray"}
            text={"Theme 3"}
            onClick={() => setColor("gray")} 
          />
          <Button
            color={"purple"}
            text={"Theme 4"}
            onClick={() => setColor("purple")} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
