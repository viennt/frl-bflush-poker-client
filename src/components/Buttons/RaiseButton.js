import React, {useState} from "react";
import {useSelector} from "react-redux";
import {sendMsg} from "../../utils/socket-io-lib";

const RaiseButton = ({show}) => {
    const setRaiseAmount = useSelector(state => state.setRaiseAmount,[]);

    const sendMessageToServer = () => {
        sendMsg("actionRaise",[setRaiseAmount])
    };

    if (!show) return null;

    return <button className="control-button" onClick={sendMessageToServer}>Raise</button>
};
export default RaiseButton
