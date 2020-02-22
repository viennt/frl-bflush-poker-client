import React from "react";
import { sendMsg } from "../../utils/socket-io-lib";
import {useDispatch, useSelector} from "react-redux";

const CallButton = ({show,curSeatID}) => {
  const playerTurn = useSelector(state => state.playerTurn,[]);
  const playerAction = useSelector(state => state.playerAction,[]);

  const currentPlayerTurn = useSelector(state => state.currentPlayerTurn,[]);

  let isMyTurn = parseFloat(currentPlayerTurn) === parseFloat(curSeatID);

  const dispatch = useDispatch();

  const sendMessageToServer = () => {
    if (isMyTurn) {
      sendMsg("actionCall");
    } else {
      dispatch({
        type: "stackAction",
        payload: {
          name: "actionCall",
          payload: playerTurn ? playerTurn["call_amount"] : 0
        }
      });
    }
  };

  if (!show) return null;
  return <button disabled={isMyTurn && playerAction && playerAction['check_available']} className="control-button" onClick={sendMessageToServer}>Call</button>
};

export default CallButton;
