import React, {useState} from "react";
import "./player-seat.css";
import {useSelector} from "react-redux";
import PlayerCards from "./PlayerCards";

const PlayerSeat = ({ avatarSource, playerName, chips, seatid , amount }) => {
    const playerTurn = useSelector(state => state.playerTurn,[]);
    const playerDealer = useSelector(state => state.playerDealer,[]);

    return (
        <div className="seat seat-player row">
            <div
                className="seat-player-content-money position-absolute"
                style={{
                    top: "-40%",
                    width: "100%",
                    zIndex: 9,
                    color: "white"
                }}>
                {amount ? "$"+amount : amount}
            </div>
            <div className="seat-player-img col-3 p-0">
                {parseInt(seatid,10) === parseInt(playerDealer,10) && <div className={'d-chip'}/>}
                <img
                    alt="seat_player_img"
                    className="seat-player-img-img"
                    src={avatarSource}
                />
            </div>
            <div className="seat-player-content col-9">
                <div className="seat-player-content-title">{playerName}</div>
                <div className="seat-player-content-line" />
                <div className="seat-player-content-money" style={chips === 'PLAYER SITTING OUT' ? {fontSize: '0.7rem'} : {}}>
                    {chips !== 'PLAYER SITTING OUT' ? '$'+chips : chips}
                </div>
            </div>
            <div id="prog-bar">
                <div
                    id="background"
                    style={
                        playerTurn && parseInt(playerTurn["seat"],10) === parseInt(seatid,10) ?
                            {opacity: 1, transitionDuration: playerTurn["total_time"] + "s", clipPath: "inset(0 100% 0 0)"} :
                            {opacity: 0}
                    }
                />
            </div>
            {
                amount && parseInt(amount,10) > 0 &&
                <div className={'red-chips'}>
                    <img src={'/assets/redChip.png'} alt={'red chip'}/>
                </div>
            }
            <PlayerCards seatid={seatid}/>
        </div>
    );
};

export default PlayerSeat;
