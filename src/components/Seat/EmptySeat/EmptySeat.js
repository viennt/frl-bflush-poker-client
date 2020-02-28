import React from "react";
import {useDispatch, useSelector} from "react-redux";

import { sendMsg } from "../../../utils/socket-io-lib";

import "./empty-seat.css";

const EmptySeat = ({ seatid }) => {
  const dispatch = useDispatch();
  const curSeatID = useSelector(state => state.curSeatID);
  const SendMessageToServer = () => {
    if (parseFloat(curSeatID) === 0) {
      sendMsg("reserveSeat", [seatid]);
      dispatch({
        type: "SET_MODAL_SHOW",
        payload: true
      });
    }
  };

  return (
      <div className="seat-player">
        <button onClick={SendMessageToServer} className={parseFloat(curSeatID) === 0 ? "select-seat-btn" : "empty-seat-btn"}>
          {parseFloat(curSeatID) === 0 ? "Select Seat" : "Empty Seat"}
        </button>
      </div>
  );
};

export default EmptySeat;
