import React, {useEffect, useRef,useState} from "react";
import {useSelector} from "react-redux";

const BlindTimer = ({showBlindTimer}) => {
    const backGroundBlind = useRef(false);
    const [seconds, setSeconds] = useState(0);
    const setTimer  = useSelector(state => state.setTimer,[]);

    useEffect(() => {
        if (setTimer) {
            if (backGroundBlind.current && setTimer - new Date().getTime() <= 0) {
                clearInterval(backGroundBlind.current)
            } else {
                backGroundBlind.current = setInterval(() => {
                    setSeconds(createTimer());
                }, 1000);
            }
            return () => clearInterval(backGroundBlind.current);
        }
        // eslint-disable-next-line
    }, [setTimer,seconds]);

    const createTimer = () => {
        let currentTime = new Date().getTime();
        let timer = (setTimer - currentTime)/1000;
        if (timer <= 0) {
            clearInterval(backGroundBlind.current)
        }

        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return minutes + ":" + seconds
    };

    if (showBlindTimer) return null;

    return <div className={'blind-timer'}>
        Blinds increase in
        <div className={'clock'}>
            {seconds}
        </div>
    </div>
};

export default BlindTimer
