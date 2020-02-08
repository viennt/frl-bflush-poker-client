import React from "react";
import "./player-seat.css";
import {useSelector} from "react-redux";

const PlayerSeat = ({ avatarSource, playerName, chips }) => {
    const showCard = useSelector(state => state.showCard);

    const renderCardInMiddle = () => {
        let listCard = showCard[0];
        if (listCard) {
            listCard.map((card,index) => {
                return <div key={index} className="seat__card" style={{ backgroundImage: `url("/engine/0.1/images/html5/cards/cards_"+${card}+".svg")` }}/>
            })
        } else return null
    };

    return (
        <div className="seat seat--player">
            <div className="seat__status">{chips}</div>
            <div className="seat__avatar" style={{backgroundImage: `url(${avatarSource})`}} />
            <div className="seat__cards">
                {renderCardInMiddle()}
            </div>
            <div className="seat__content">
                <div className="seat__content__title">{playerName}</div>
                <div className="seat__content__money">6,800$</div>
            </div>
        </div>
    );
};

export default PlayerSeat;
