import React from "react";
import { sendMsg } from "../../utils/socket-io-lib";

const CallButton = () => {
  const sendMessageToServer = () => {
    sendMsg("actionCall");
  };

  return (
    <button className="control-button" onClick={sendMessageToServer}>Call</button>
  );
};

export default CallButton;
