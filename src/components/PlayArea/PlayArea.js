import React from "react";
import "./play-area.css";
import {Seat} from "../Seat";
import {PlayAreaBackground} from "./index";
import CardArea from "../../containers/CardArea";

const PlayArea = ({ children }) => {
  return (
    <div className="play-area">
      <Seat seatid="1" />
      <Seat seatid="2" />
      <Seat seatid="3" />
      <Seat seatid="4" />
      <Seat seatid="5" />
      <Seat seatid="6" />
      <Seat seatid="7" />
      <Seat seatid="8" />
      <Seat seatid="9" />
      <Seat seatid="10" />
      <PlayAreaBackground />
      <CardArea />
    </div>
  );
};

export default PlayArea;
