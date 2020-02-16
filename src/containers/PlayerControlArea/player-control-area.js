import React from "react";
import "./player-control-area.css";
import { useSelector , useDispatch } from "react-redux";
import { FilterSeatPlayerByUser } from "../../utils/filter";

import FoldButton from "../../components/Buttons/FoldButton";
import CallButton from "../../components/Buttons/CallButton";

const PlayerControlArea = (props) => {
  let fold_btn = "";
  let call_btn = "";
  let call_any_btn = "";
  let bet_btn = "";
  let show_player_control = false;

  const curSeat = useSelector(state => state.curSeatID,[]);
  const playerSitout = useSelector(state => state.playerSitout,[]);


  if (!playerSitout.includes(curSeat)) {
    show_player_control = true;
  }

  if (show_player_control) {
    fold_btn = <FoldButton />;
    call_btn = <CallButton />;
    call_any_btn = <button className="control-button">Call any</button>;
    bet_btn = <button className="control-button">Bet</button>;
  }

  if (curSeat === 0) {
    return <div className="control-area" />;
  }

  return (
    <div className="control-area">
      {fold_btn}
      {call_btn}
      {call_any_btn}
      {bet_btn}
    </div>
  );
};

export default PlayerControlArea;
