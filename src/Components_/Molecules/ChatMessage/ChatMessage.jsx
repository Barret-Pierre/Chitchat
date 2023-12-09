import React from 'react';
import Bubble from '../Bubble/Bubble';
import Avatar from '../../Atoms/Avatar/Avatar';
import "./ChatMessage.css";

const ChatMessage = ({ user, message, isCurrent }) => {
    let notCurrent = !isCurrent ? 'notCurrent' : '';

    return (
        <div className={`chatMessage ${notCurrent}`}>
            <Bubble text={message} type="medium" propriety="black" />
            <Avatar size="small" url={user.avatar} name={user.username} connected={user.isConnected} />
        </div>
    );
};

export default ChatMessage;