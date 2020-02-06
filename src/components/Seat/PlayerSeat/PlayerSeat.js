import React from "react";
import "./player-seat.css";

const PlayerSeat = ({ avatarSource, playerName, chips }) => {
  return (
    <div className="seat seat--player">
      <div className="seat__status">Fold</div>
      <div className="seat__avatar" style={{backgroundImage: `url(${avatarSource})`}} />
      {/*<div className="player-seat-content">*/}
      {/*  <div className="player-seat-content-title">{playerName}</div>*/}
      {/*  <div className="player-seat-content-line" />*/}
      {/*  <div className="player-seat-content-money">{chips}</div>*/}
      {/*</div>*/}
    </div>
  );
};

export default PlayerSeat;
