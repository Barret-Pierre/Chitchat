import React from 'react';
import Avatar from '../../Atoms/Avatar/Avatar';
import Text from '../../Atoms/Text/Text';
import Button from '../../Atoms/Button/Button';
import Icon from '../../Atoms/Icon/Icon';
import "./UserAdd.css";

const UserAdd = ({ username, isConnected }) => {
    return (
        <div className='flex flex-row jc-sbetween ai-center gap-3'>
            <div className='user flex flex-row gap-3 ai-center'>
                <Avatar size='small' url='https://cdn-icons-png.flaticon.com/256/25/25231.png' connected={isConnected} />
                <Text type='medium' propriety='bold' text={username} />
            </div>
            <div>
                    <Icon value='AddCircleIcon' />
            </div>
        </div>
    );
};

export default UserAdd;