import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionList, assetBaseUrl} from "../../../const";

const PlayerCards = ({seatid}) => {
    const showCard = useSelector(state => state.showCard,[]);
    const highlightCards = useSelector(state => state.highlightCards,[]);
    const playerActionStatus = useSelector(state => state.playerActionStatus[seatid],[]);

    const dispatch = useDispatch();

    const resetHightlightCard = () => {
        if (parseFloat(highlightCards) !== 0 && parseFloat(highlightCards) === parseFloat(seatid)) {
            setTimeout(() => {
                dispatch({
                    type: 'removeHightlightCard',
                    payload: 0
                })
            },4000)
        }
    };

    useEffect(() => {
        resetHightlightCard()
    });

    const renderCardInMiddle = () => {
        let listCard = showCard[seatid];
        if (listCard) {
            let displayCards = [];
            listCard.forEach((card,index) => {
                displayCards.push(
                    <div
                        key={index}
                        className={"seat__card"}
                        style={
                            playerActionStatus === actionList[2].toUpperCase() ?
                                {opacity: 0.6} :
                                {opacity: 1}
                        }
                    >
                        <img
                            className={parseFloat(highlightCards) === parseFloat(seatid) ? "hightlight-card" : ""}
                             src={assetBaseUrl + '/images/html5/cards/cards_' + card + '.svg'}
                             alt={'card-player-show'}
                        />
                    </div>
                )
            });
            return <div className={'seat__card_container'}>
                {displayCards}
            </div>;
        } else return null
    };

    return renderCardInMiddle();
};

export default PlayerCards
