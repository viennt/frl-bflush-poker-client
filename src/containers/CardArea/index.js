import React, {  } from "react";
import "./card-area.css";
import {useSelector} from "react-redux";

const CardArea = (props) => {
  const showCard = useSelector(state => state.showCard);
  const mainPotStatus = useSelector(state => state.mainPotStatus);

  const renderCardInMiddle = () => {
    let listCard = showCard[0];
    if (listCard) {
      listCard.map((card,index) => {
        return <div key={index}>
          <image href={"/engine/0.1/images/html5/cards/cards_"+card+".svg"}/>
        </div>
      });
      return <div>
        {listCard}
        {mainPotStatus !== null ? 'Total Pot: ' + mainPotStatus : ''}
      </div>;
    } else return null
  };

  return <div className="card-area">{renderCardInMiddle()}</div>;
};

export default CardArea;
