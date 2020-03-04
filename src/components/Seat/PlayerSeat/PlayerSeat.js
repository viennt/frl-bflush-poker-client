import React from "react";
import "./player-seat.css";
import {useSelector} from "react-redux";
import PlayerCards from "./PlayerCards";
import {playerSitout} from "../../../const";
import redChips from '../../../assets/redChip.png';
import dealerChips from '../../../assets/dealer-chip.svg';
const PlayerSeat = ({ avatarSource, playerName, chips, seatid , amount }) => {
    const playerTurn = useSelector(state => state.playerTurn,[]);
    const playerDealer = useSelector(state => state.playerDealer,[]);

    return (
        <div className="seat-player container">
            {amount &&
            <div
                className="seat-player-content-money amount position-absolute">
               {"£"+parseFloat(amount).toFixed(2)}
            </div>}
            <div className="row" style={{height: "100%"}}>
                <div className="seat-player-img col-3 p-0">
                    {parseFloat(seatid) === parseFloat(playerDealer) &&
                    <div className={'d-chip'}>
                        <img src={dealerChips} alt={'dealer-chip'}/>
                    </div>}
                    <img
                        alt="seat_player_img"
                        className="seat-player-img-img"
                        src={avatarSource}
                    />
                </div>
                <div className="seat-player-content col-9">
                    <div className="seat-player-content-title">{playerName}</div>
                    <div className="seat-player-content-line" />
                    {/* eslint-disable-next-line no-undef */}
                    <div
                        className={chips === playerSitout ? "seat-player-content-money chips" : "seat-player-content-money"}
                    >
                        {!isNaN(chips) ? '£'+parseFloat(chips).toFixed(2) : chips}
                    </div>
                </div>
            </div>
            <div id="prog-bar">
                <div
                    id="background"
                    style={
                        playerTurn && parseFloat(playerTurn["seat"]) === parseFloat(seatid) ?
                            {
                                opacity: 1,
                                transitionDuration: playerTurn["total_time"] + "s",
                                clipPath: "inset(0 100% 0 0)"
                            } :
                            {opacity: 0}
                    }
                />
            </div>
            {
                amount && parseFloat(amount) > 0 &&
                <div className={'red-chips'}>
                    <img src={redChips} alt={'red chip'}/>
                </div>
            }
            <PlayerCards seatid={seatid}/>
        </div>
    );
};

export default PlayerSeat;
