import React from "react";
import {useSelector} from "react-redux";

const BlindTimer = ({props}) => {
    const isTournamentGame = useSelector(state => state.isTournamentGame);
    const tableDetails = useSelector(state => state.tableDetails,[]);
    const setTimer  = useSelector(state => state.setTimer,[]);
    let show = isTournamentGame && tableDetails;

    const createTimer = (duration) => {
        let timer = duration, minutes, seconds;

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return minutes + ":" + seconds
    };

    if (!show) return null;

    return <div className={'blind-timer'}>
        Blinds increase in
        <div className={'clock'}>
            {createTimer(setTimer)}
        </div>
    </div>
};

export default BlindTimer
