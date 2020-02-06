import React, {useState,useRef} from "react";
import {sendMsg} from "../../utils/socket-io-lib";

const ChatSection = (props) => {
    const [ message, setMessage ] = useState('');
    const inputEl = useRef(null);


    function handleSendMessage() {
        sendMsg("chat",[message]);
        setMessage('');
        inputEl.current.focus();
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return <div className={'action-section'}>
        <input
            value={message}
            ref={inputEl} type="text"
            onChange={(e) => {handleChange(e)}}
            onKeyDown={handleKeyDown}
        />
        <button
            className="control-button"
            onClick={() => handleSendMessage()}
        >
            send
        </button>
    </div>
};

export default ChatSection;
