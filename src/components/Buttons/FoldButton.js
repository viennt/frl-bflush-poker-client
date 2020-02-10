import React from "react";
import { sendMsg } from "../../utils/socket-io-lib";

const FoldButton = () => {
  const sendMessageToServer = () => {
    sendMsg("actionFold");
  };

  return (
    <button className="control-button" onClick={sendMessageToServer}>Fold</button>
  );
};

export default FoldButton;
