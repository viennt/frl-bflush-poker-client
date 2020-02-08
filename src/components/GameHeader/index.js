import React from "react";
import Menu from "./Menu";
import UpdateStatusGame from "./UpdateStatusGame";

const GameHeader = (props) => {
    return <div className="game__header row">
        <Menu />
        <div className={'spacer'}/>
        <UpdateStatusGame />
    </div>
};

export default GameHeader;
