import React, {  } from "react";
import "./card-area.css";
import {useSelector} from "react-redux";
import {assetBaseUrl} from "../../const";

const CardArea = (props) => {
  const showCard = useSelector(state => state.showCard,[]);
  const mainPotStatus = useSelector(state => state.mainPotStatus,[]);

  const renderCardInMiddle = () => {
    let listCard = showCard["0"];
    if (listCard) {
      let displayCard = [];
      listCard.forEach((card,index) => {
        displayCard.push(
            <div
                key={index}
                className="seat__card"
            >
              <img
                src={assetBaseUrl + '/images/html5/cards/cards_' + card + '.svg'}
                alt={'card-middle-table'}
              />
            </div>
        )
      });
      return (
            <div className={'card__middle'}>
              {displayCard}
            </div>
      );
    } else return null
  };

  return <div className="card-area">
    {renderCardInMiddle()}
    <div className={'total-pot'}>
      {mainPotStatus ? 'Total Pot: £' + mainPotStatus : ''}
    </div>
  </div>;
};

export default CardArea;
