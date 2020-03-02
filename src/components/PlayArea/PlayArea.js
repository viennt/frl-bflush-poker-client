import React from "react";
import "./play-area.css";
import {Seat} from "../Seat";
import {PlayAreaBackground} from "./index";
import CardArea from "../../containers/CardArea";
import {useSelector} from "react-redux";
import {seatMap} from "../../const";
import {positioningPlayer} from "../../utils/playerController";

const PlayArea = ({ children }) => {
    const curSeatID = useSelector(state => state.curSeatID,[]);
    const tableDetails = useSelector(state => state.tableDetails,[]);
    const renderSeat = () => {
        let seats = [];
        let seatid = 1;
        let matrixSeat = seatMap[tableDetails["max_players"]];
        for (let i = 1; i <= 10; i++) {
            if (matrixSeat[seatid] === i) {
                seats.push(<Seat seatid={seatid.toString()} key={i} />);
                seatid++;
            } else {
                seats.push(<div key={i}/>)
            }
        }
        if (parseFloat(curSeatID) !== 0) {
            seats = positioningPlayer(tableDetails["max_players"], curSeatID, seats);
        }
        return seats;
    };

    return (
        <div className="play-area">
            {tableDetails && renderSeat()}
            <PlayAreaBackground />
            <CardArea />
        </div>
    );
};

export default PlayArea;
