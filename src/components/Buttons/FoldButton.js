import React from "react";
import { sendMsg } from "../../utils/socket-io-lib";
import {useDispatch, useSelector} from "react-redux";

const FoldButton = ({show,curSeatID}) => {
  const currentPlayerTurn = useSelector(state => state.currentPlayerTurn,[]);

  let isMyTurn = parseFloat(currentPlayerTurn) === parseFloat(curSeatID);

  const dispatch = useDispatch();

  const sendMessageToServer = () => {
    if (isMyTurn) {
      sendMsg("actionFold");
    } else {
      dispatch({
        type: "stackAction",
        payload: {
          name: "actionFold"
        }
      })
    }
  };

  if (!show) return null;
  return (
    <button className="control-button" onClick={sendMessageToServer}>Fold</button>
  );
};

export default FoldButton;
