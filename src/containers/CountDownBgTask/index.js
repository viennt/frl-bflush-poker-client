// eslint-disable-next-line no-unused-vars
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

const CountDownBgTask = (props) => {
    const setTimer = useSelector(state => state.setTimer,[]);
    const backGroundTimer = useRef(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (setTimer && parseFloat(setTimer) > 0) {
            let time = setTimer;
            time--;
            backGroundTimer.current = setTimeout(() => {
                dispatch({
                    type: "setTimer",
                    payload: time
                })
            },1000);
            if (time < 0) {
                clearTimeout(backGroundTimer.current)
            }
        } else if (backGroundTimer.current) {
            clearTimeout(backGroundTimer.current)
        }
        // eslint-disable-next-line
    },[setTimer]);

    return null
};

export default CountDownBgTask;
