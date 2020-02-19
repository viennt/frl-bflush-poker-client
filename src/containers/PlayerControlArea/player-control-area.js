import React from "react";
import "./player-control-area.css";
import { useSelector  } from "react-redux";

import FoldButton from "../../components/Buttons/FoldButton";
import CallButton from "../../components/Buttons/CallButton";
import CheckButton from "../../components/Buttons/CheckButton";
import RaiseButton from "../../components/Buttons/RaiseButton";
import RaiseDetailActions from "../../components/Buttons/RaiseDetailActions";

const PlayerControlArea = (props) => {
  let show_player_control = false;

  const curSeat = useSelector(state => state.curSeatID,[]);
  const playerSitout = useSelector(state => state.playerSitout,[]);
  const showActions = useSelector(state => state.showActions,[]);
  const playerAction = useSelector(state => state.playerAction,[]);

  if (!playerSitout.includes(curSeat)) {
    show_player_control = true;
  }

  if (show_player_control) {
    if (!showActions) {
      return (
          <div className="control-area">
            <FoldButton showActions={showActions}/>
            <CallButton showActions={showActions}/>
            <button className="control-button">Call any</button>
          </div>
      );
    } else if (playerAction){
      return (
          <div className="control-area">
            <FoldButton showActions={showActions}/>
            <CallButton showActions={showActions}/>
            <CheckButton showActions={showActions}/>
            <RaiseButton />
            <RaiseDetailActions />
          </div>
      )
    }
  }
  return null
};

export default PlayerControlArea;
