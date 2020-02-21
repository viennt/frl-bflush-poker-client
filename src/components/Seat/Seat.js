import React from "react";
import { useSelector } from "react-redux";

import EmptySeat from "./EmptySeat/EmptySeat";
import PlayerSeat from "./PlayerSeat/PlayerSeat";

import "./seat.css";

const Seat = ({ seatid }) => {
  let playerName = "";
  let avatarSource = "";
  let chips = "";
  let amount = "";

  const seatPlayer = useSelector(state => state.seatPlayer[seatid],[]);
  const emptySeat = useSelector(state => state.emptySeat,[]);
  const playerSitout = useSelector(state => state.playerSitout,[]);

  if (seatPlayer) {
    playerName = seatPlayer['user_name'];
    avatarSource = seatPlayer['avatar'] !== "" ?
        "https://www.dev-b.bflush.com/" + seatPlayer['avatar'] :
        "https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png";
    chips = seatPlayer['chips'];
    amount = seatPlayer['amount']
  }

  if (playerSitout.includes(seatid)) {
    chips = "PLAYER SITTING OUT";
  }

  if (emptySeat.includes(seatid)) {
    return <EmptySeat seatid={seatid} />;
  } else if (seatPlayer) {
    return (
        <PlayerSeat
            seatid={seatid}
            playerName={playerName}
            avatarSource={avatarSource}
            chips={chips}
            amount={amount}
        />
    );
  } else {
    return <div />;
  }
};

export default Seat;
