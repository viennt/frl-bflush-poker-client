import React from "react";
import {useSelector} from "react-redux";
import {sendMsg} from "../../utils/socket-io-lib";

const RaiseButton = ({show}) => {
    const setRaiseAmount = useSelector(state => state.setRaiseAmount,[]);
    const stackAction = useSelector(state => state.stackAction,[]);

    const sendMessageToServer = () => {
        sendMsg("actionRaise",[setRaiseAmount])
    };

    if (!show) return null;

    return <button
        className={stackAction && stackAction.name === 'actionFold' ? "control-button selected" : "control-button"}
        onClick={sendMessageToServer}>
        Raise
    </button>
};
export default RaiseButton
