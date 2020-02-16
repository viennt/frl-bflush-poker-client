import React from "react";
import "./player-seat.css";
import {useSelector} from "react-redux";

const PlayerSeat = ({ avatarSource, playerName, chips }) => {
    const showCard = useSelector(state => state.showCard,[]);

    const renderCardInMiddle = () => {
        let listCard = showCard[0];
        if (listCard) {
            listCard.map((card,index) => {
                return <div key={index} className="seat__card" style={{ backgroundImage: `url("/engine/0.1/images/html5/cards/cards_"+${card}+".svg")` }}/>
            })
        } else return null
    };

    return (
        <div className="seat seat-player row">
            <div className="seat-player-img col-3 p-0">
                <img
                    alt="seat_player_img"
                    className="seat-player-img-img"
                    src={avatarSource}
                />
            </div>
            <div className="seat-player-content col-9">
                <div className="seat-player-content-title">{playerName}</div>
                <div className="seat-player-content-line" />
                <div className="seat-player-content-money">{chips !== 'PLAYER SITTING OUT' ? '$'+chips : chips}</div>
            </div>
            <div className={'timer'}/>
            {renderCardInMiddle()}
        </div>
    );
};

export default PlayerSeat;
