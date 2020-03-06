import React from "react";
import Menu from "./Menu";
import UpdateStatusGame from "./UpdateStatusGame";
import ShowFullScreen from "../ShowFullScreen";

const GameHeader = (props) => {
    return <div className="game__header row">
        <ShowFullScreen/>
        <Menu />
        <div className={'spacer'}/>
        <UpdateStatusGame />
    </div>
};

export default GameHeader;
