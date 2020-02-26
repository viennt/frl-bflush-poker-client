import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const BlindTimer = ({props}) => {
    const isTournamentGame = useSelector(state => state.isTournamentGame,[]);
    const tableDetails = useSelector(state => state.tableDetails,[]);
    const updateBlinds = useSelector(state => state.updateBlinds,[]);


    const [countTime,setCountTime] = useState(0);
    let show = false;

    const startTimer = (duration) => {
        let timer = duration, minutes, seconds;
        let myCountDown = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            setCountTime(minutes + ":" + seconds);

            if (--timer < 0) {
                clearInterval(myCountDown);
            }
        }, 1000);
    };

    show = isTournamentGame && tableDetails;

    useEffect(() => {
        if (show) {
            let time = tableDetails["blinds_timer"];
            if (updateBlinds) {
                time = updateBlinds['time_remaining']
            }
            startTimer(time)
        }
    },[show, tableDetails, updateBlinds]);

    if (!show) return null;

    return <div className={'blind-timer'}>
        Blinds increase in
        <div className={'clock'}>
            {countTime}
        </div>
    </div>
};

export default BlindTimer
