import React from "react";
import "./player-seat.css";

const PlayerSeat = ({ avatarSource, playerName, chips }) => {
  return (
    <div className="seat seat--player">
      <div className="seat__status">{chips}</div>
      <div className="seat__avatar" style={{backgroundImage: `url(${avatarSource})`}} />
      <div className="seat__cards">
        <div className="seat__card" />
        <div className="seat__card" />
      </div>
      <div className="seat__content">
        <div className="seat__content__title">{playerName}</div>
        <div className="seat__content__money">6,800$</div>
      </div>
    </div>
  );
};

export default PlayerSeat;
