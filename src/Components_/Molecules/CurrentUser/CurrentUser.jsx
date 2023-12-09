import React from 'react';
import Avatar from '../../Atoms/Avatar/Avatar';
import Text from '../../Atoms/Text/Text';
import "./CurrentUser.css";

const CurrentUser = ({ username, isConnected }) => {
    return (
        <div className='current--user flex gap-3 ai-center'>
            <Avatar size='medium' url='https://cdn-icons-png.flaticon.com/256/25/25231.png' connected={isConnected} name='username' />
            <Text type='medium' propriety='bold' text={username} />
        </div>

    );
};

export default CurrentUser;