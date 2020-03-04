import React from "react";
import {useSelector} from "react-redux";
import {sendMsg} from "../../utils/socket-io-lib";

const RaiseButton = ({show}) => {
    const curSeatID = useSelector(state => state.curSeatID,[]);
    const setRaiseAmount = useSelector(state => state.setRaiseAmount[curSeatID],[]);

    const sendMessageToServer = () => {
        sendMsg("actionRaise",[parseFloat(setRaiseAmount).toFixed(2)])
    };

    if (!show) return null;

    return <button
        className={"control-button"}
        onClick={sendMessageToServer}>
        Raise
    </button>
};
export default RaiseButton
