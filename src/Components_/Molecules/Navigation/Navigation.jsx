import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import "./Navigation.css";

function Navigation() {
    return (
        <div className='navigation w-100'>
            <Icon value="SmsIcon" />
            <Icon value="SearchIcon" />
        </div>
    );
};

export default Navigation;