import React from "react";
import { sendMsg } from "../../utils/socket-io-lib";
import {useDispatch, useSelector} from "react-redux";

const CallButton = ({showActions}) => {
  const playerAction = useSelector(state => state.playerAction,[]);
  const dispatch = useDispatch();
  const sendMessageToServer = () => {
    if (showActions) {
      sendMsg("actionCall");
    } else {
      dispatch({
        type: "stackAction",
        payload: "actionCall"
      })
    }
  };

  if (showActions) {
    if (playerAction && playerAction["check_available"]) {
      return (
          <button className="control-button" onClick={sendMessageToServer}>Call</button>
      );
    }
  } else {
    return <button className="control-button" onClick={sendMessageToServer}>Call</button>
  }
};

export default CallButton;
