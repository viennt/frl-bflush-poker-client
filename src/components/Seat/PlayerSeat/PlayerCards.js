import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const PlayerCards = ({seatid}) => {
    const showCard = useSelector(state => state.showCard,[]);
    const highlightCards = useSelector(state => state.highlightCards,[]);
    const dispatch = useDispatch();

    const resetHightlightCard = () => {
        if (parseInt(highlightCards,10) !== 0 && parseInt(highlightCards,10) === parseInt(seatid,10)) {
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
                    >
                        <img
                            className={parseInt(highlightCards,10) === parseInt(seatid,10) ? "hightlight-card" : ""}
                             src={'https://www.dev-b.bflush.com/engine/0.1/images/html5/cards/cards_' + card + '.svg'}
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
