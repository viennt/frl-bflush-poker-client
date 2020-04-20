import React, {useEffect} from "react";
import "./player-seat.css";
import {useDispatch, useSelector} from "react-redux";
import PlayerCards from "./PlayerCards";
import {playerSitout, WINNER} from "../../../const";
import redChips from '../../../assets/redChip.png';
import dealerChips from '../../../assets/dealer-chip.svg';
const PlayerSeat = ({ avatarSource, playerName, chips, seatid , amount }) => {
    const playerTurn = useSelector(state => state.playerTurn,[]);
    const playerDealer = useSelector(state => state.playerDealer,[]);
    const currentPlayerTurn = useSelector(state => state.currentPlayerTurn,[]);
    const playerWinner = useSelector(state => state.playerWinner,[]);
    const playerActionStatus = useSelector(state => state.playerActionStatus[seatid],[]);
    const isTournamentGame = useSelector(state => state.isTournamentGame,[]);


    const dispatch = useDispatch();

    useEffect(() => {
        if (playerWinner !== null) {
            setTimeout(() => {
                dispatch({
                    type: "resetPlayerWinner"
                })
            },2500)
        }
    });

    let isMyTurn = parseFloat(currentPlayerTurn) === parseFloat(seatid);

    return (
        <div className={isMyTurn ? "seat-player container hightlight-turn" : "seat-player container"}>
            {amount &&
            <div
                className="seat-player-content-money amount position-absolute">
               {
                   isTournamentGame ?
                       parseFloat(amount) :
                       "£"+parseFloat(amount).toFixed(2)
               }
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
                        className={!playerActionStatus && chips === playerSitout ? "seat-player-content-money chips" : "seat-player-content-money"}
                    >
                        {
                            playerWinner && parseFloat(playerWinner) === parseFloat(seatid) ?
                                WINNER :
                                (playerActionStatus ?
                                    playerActionStatus :
                                    (
                                        !isNaN(chips) ?
                                            (
                                                isTournamentGame ?
                                                    parseFloat(chips) :
                                                    '£'+parseFloat(chips).toFixed(2)
                                            ) :
                                            chips
                                    )
                                )
                        }
                    </div>
                </div>
            </div>
            <div id="prog-bar">
                <div className="progress">
                    <div
                        className="progress-bar-cus"
                        style={
                            playerTurn && parseFloat(playerTurn["seat"]) === parseFloat(seatid) ?
                                {
                                    opacity: 1,
                                    animationDuration: playerTurn["total_time"] + "s"
                                } :
                                {opacity: 0}
                        }
                    >
                    </div>
                </div>
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
