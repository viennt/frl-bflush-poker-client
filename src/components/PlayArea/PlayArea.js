import React from "react";
import "./play-area.css";
import {Seat} from "../Seat";
import {PlayAreaBackground} from "./index";
import CardArea from "../../containers/CardArea";
import {useSelector} from "react-redux";

const PlayArea = ({ children }) => {
    const curSeatID = useSelector(state => state.curSeatID,[]);

    const renderSeat = () => {
        let seats = [];
        for (let i = 1; i <= 10; i++) {
            seats.push(<Seat seatid={i.toString()} key={i} />)
        }
        if (parseFloat(curSeatID) !== 0) {
            if (parseFloat(curSeatID) <= 5) {
                let backupArray = [...seats];
                let moveArray = [];
                let startMoveIndex = parseFloat(curSeatID) + 5;
                let numberMoveItems = 9;
                for (let m = startMoveIndex; m <= numberMoveItems; m++) {
                    moveArray.push(backupArray[m])
                }
                let leftArray = [];
                for (let j = 0; j <= parseFloat(curSeatID) + 4; j++ ) {
                    leftArray.push(backupArray[j])
                }
                seats = [...moveArray,...leftArray];
            } else {
                let backupArray = [...seats];
                let moveArray = [];
                let startMoveIndex = 0;
                let numberMoveItems = parseFloat(curSeatID) - 5;
                for (let m = startMoveIndex; m < numberMoveItems; m++) {
                    moveArray.push(backupArray[m])
                }
                let leftArray = [];
                for (let j = numberMoveItems; j <= 9; j++ ) {
                    leftArray.push(backupArray[j])
                }
                seats = [...leftArray,...moveArray];
            }
        }
        return seats;
    };

    return (
        <div className="play-area">
            {renderSeat()}
            <PlayAreaBackground />
            <CardArea />
        </div>
    );
};

export default PlayArea;
