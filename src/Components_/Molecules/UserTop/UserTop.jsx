import React from 'react';
import Avatar from '../../Atoms/Avatar/Avatar';
import State from '../../Atoms/State';
import Text from '../../Atoms/Text/Text';
import "./UserTop.css";

const UserTop = ({ username, isConnected }) => {
    return (
        <header className='usertop gap-3'>
            <Avatar size='small' url='https://cdn-icons-png.flaticon.com/256/25/25231.png' connected={isConnected} />
            <div className='gap-1'>
                <Text type='medium' propriety='bold' text={username} />
                <State value="true" />
            </div>
        </header>
    );
};

export default UserTop;