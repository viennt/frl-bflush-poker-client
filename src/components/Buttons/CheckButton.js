import React from "react";
import {sendMsg} from "../../utils/socket-io-lib";
import {useSelector} from "react-redux";

const CheckButton = ({showActions}) => {
    const playerAction = useSelector(state => state.playerAction,[]);

    const sendMessageToServer = () => {
        sendMsg("actionCheck")
    };
    // if (playerAction && playerAction["check_available"]) {
        return <button className="control-button" onClick={sendMessageToServer}>Check</button>
    // }
    // return null
};

export default CheckButton;
