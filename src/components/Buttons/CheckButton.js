import React from "react";
import {sendMsg} from "../../utils/socket-io-lib";

const CheckButton = ({showActions}) => {
    const sendMessageToServer = () => {
        sendMsg("actionCheck")
    };

    return <button className="control-button" onClick={sendMessageToServer}>Check</button>
};

export default CheckButton;
