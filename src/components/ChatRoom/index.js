import React,{ useRef, useEffect } from "react";
import "./chat-room.css";
import {useSelector} from 'react-redux'
import ChatSection from "./chatSection";

const ChatRoom = (props) => {
    const updateChat = useSelector(state => state.updateChat);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ blok: "start", behavior: "smooth" });
    }, [updateChat.length]);

    const renderChat = () => {
        let chat = updateChat;
        let chatDisplay = [];
        chat.forEach((item,index) => {
            chatDisplay.push(
                <div key={index}>
                    <b>{item.username}</b>: {item.content}
                </div>)
        });
        return chatDisplay
    };

    return (
        <div className={'chat-room'}>
            <div
                className={'display-chat'}
            >
                {renderChat()}
                <div style={{ float:"left", clear: "both" }} ref={messagesEndRef}/>
            </div>
            <ChatSection/>
        </div>
    )
};
export default ChatRoom
