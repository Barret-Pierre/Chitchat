import React from 'react';
import Avatar from '../../Atoms/Avatar/Avatar';
import Text from '../../Atoms/Text/Text';
import "./UserTitle.css";

const UserTitle = ({ username, isConnected }) => {
    return (
        <div className='user flex flex-row gap-4 ai-center'>
            <Avatar size='large' url='https://cdn-icons-png.flaticon.com/256/25/25231.png' connected={isConnected} />
            <div className='flex flex-column gap-2'>
                <Text type='medium' propriety='bold' text={username} />
                <label htmlFor="avatar">Choisir une photo</label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" hidden />
            </div>
        </div>
    );
};

export default UserTitle;