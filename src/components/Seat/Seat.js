import React from "react";
import { useSelector } from "react-redux";

import EmptySeat from "./EmptySeat/EmptySeat";
import PlayerSeat from "./PlayerSeat/PlayerSeat";

import "./seat.css";

const Seat = ({ seatid }) => {
  let playerName = "";
  let avatarSource = "";
  let chips = "";
  let render_seat;

  const receiveMsg = useSelector(state => state.receiveMsg);

  // get all empty seat
  const emptySeatID = receiveMsg
    .filter(receive => {
      return receive.message === "emptySeat";
    })
    .filter(seat => {
      return seat.params[0] === seatid;
    });

  // Get seat all seatplayer id
  const seatPlayerID = receiveMsg
    .filter(receive => {
      return receive.message === "seatPlayer";
    })
    .filter(seat => {
      return seat.params[0] === seatid;
    });

  // Get sitting out seatplayerid

  const sitOutPlayerID = receiveMsg
    .filter(receive => {
      return receive.message === "playerSitout";
    })
    .filter(seat => {
      return seat.params[0] === seatid;
    });

  // Check the seat empty or not
  if (Object.keys(emptySeatID).length >= 1) {
    if (emptySeatID[0].params[0] === seatid) {
      render_seat = "empty";
    }
  }

  // If the seat are not empty, here you are player
  if (
    Object.keys(seatPlayerID).length >= 1 &&
    seatPlayerID[0].params[0] === seatid
  ) {
    // Render name of player
    playerName = seatPlayerID[0].params[1];

    // Render Chips
    chips = seatPlayerID[0].params[2];

    // Render Avartar of player
    if (seatPlayerID[0].params[3] === "") {
      avatarSource =
        "https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png";
    } else {
      avatarSource =
        "https://www.dev-b.bflush.com/" + seatPlayerID[0].params[3];
    }

    render_seat = "player";
  }

  if (
    Object.keys(sitOutPlayerID).length >= 1 &&
    sitOutPlayerID[0].params[0] === seatid
  ) {
    chips = "SITTING OUT";
  }

  if (render_seat === "empty") {
    return <EmptySeat seatid={seatid} />;
  } else if (render_seat === "player") {
    return (
      <PlayerSeat
        playerName={playerName}
        avatarSource={avatarSource}
        chips={chips}
      />
    );
  } else {
    return <div />;
  }
};

export default Seat;
