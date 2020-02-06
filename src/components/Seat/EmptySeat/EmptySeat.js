import React from "react";
import { useDispatch} from "react-redux";

import { sendMsg } from "../../../utils/socket-io-lib";

import "./empty-seat.css";

const EmptySeat = ({ seatid }) => {
  const dispatch = useDispatch();

  const SendMessageToServer = () => {
    sendMsg("reserveSeat", [seatid]);
    dispatch({
      type: "UPDATE_MSG",
      payload: "reserveSeat"
    });
    dispatch({
      type: "SET_MODAL_SHOW",
      payload: true
    });
  };

  return (
    <div className="seat seat--empty" onClick={SendMessageToServer}>
      <span>empty</span>
    </div>
  );
};

export default EmptySeat;
