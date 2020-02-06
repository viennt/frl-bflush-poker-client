import React from "react";
import "./play-area.css";

const PlayArea = ({ children }) => {
  return (
    <div className="play-area">{children}</div>
  );
};

export default PlayArea;
