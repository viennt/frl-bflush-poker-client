import React from "react";
import { sendMsg } from "../../utils/socket-io-lib";
import {useDispatch} from "react-redux";

const FoldButton = ({showActions}) => {
  const dispatch = useDispatch();
  const sendMessageToServer = () => {
    if (showActions) {
      sendMsg("actionFold");
    } else {
      dispatch({
        type: "stackAction",
        payload: "actionFold"
      })
    }
  };

  return (
    <button className="control-button" onClick={sendMessageToServer}>{showActions ? "Fold" : "Check/Fold"}</button>
  );
};

export default FoldButton;
