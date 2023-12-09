import React from 'react';
import { useNavigate } from "react-router-dom";
import UserTop from '../Molecules/UserTop/UserTop'
import ChatHeader from '../Molecules/ChatHeader/ChatHeader';

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate()

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }

  let username = 'test TEST';
  let isConnected = true;

  return (
    <>
      <UserTop username={username} isConnected={isConnected} />
      <ChatHeader />
      <div className='message__container'>
        {messages.map(message => (
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className='sender__name'>You</p>
              <div className='message__sender'>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className='message__recipient'>
                <p>{message.text}</p>
              </div>
            </div>
          )
        ))}

        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />   
      </div>
    </>
  )
}

export default ChatBody