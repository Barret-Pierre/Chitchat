import React, { useState, useEffect } from 'react';
import CurrentUser from '../Molecules/CurrentUser/CurrentUser';
import Navigation from '../Molecules/Navigation/Navigation';
import UserHistory from '../Molecules/UserHistory/UserHistory';
import UserAdd from '../Molecules/UserAdd/UserAdd';
import ChatMessage from '../Molecules/ChatMessage/ChatMessage';
import UserTitle from '../Molecules/UserTitle/UserTitle';
import Search from '../Atoms/Search/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParamSidebar from './ParamSidebar/ParamSidebar';
import ButtonSidebar from './ParamSidebar/ButtonSidebar';
import { SidebarProvider } from './ParamSidebar/ParamSidebarContext';



const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])


    const user = {
        username: "Gérard MANVUSSA",
        avatar: "https://cdn-icons-png.flaticon.com/256/25/25231.png",
        isConnected: true
    };


    return (
        <>
        <div className='chat__sidebar'>

            <CurrentUser username={user.username} isConnected={user.isConnected} />

            <Navigation />

            <Search />
            <div className='chat__users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>

            <UserHistory username={user.username} isConnected={user.isConnected} />

            <UserAdd username={user.username} isConnected={user.isConnected} />

            <ChatMessage user={user} message="Hello World !" isCurrent={true} />

            <UserTitle username={user.username} isConnected={user.isConnected} />

        </div>

        
        <SidebarProvider>
            <ButtonSidebar />
            <ParamSidebar />
        </SidebarProvider>
    </>
    )
}

export default ChatBar