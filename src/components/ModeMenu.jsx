import React, { useState } from 'react'
import '../styles/ModeMenu.css';


const ModeMenu = () => {
    const [activeItem, setActiveItem] = useState('sale');

    const changeItem = (name) => {
        setActiveItem(name);
    }

    return (
        <div className="mode">
            <div onClick={() => changeItem('sale')} className={activeItem === 'sale' ? 'menu__item active' : 'menu__item'}>
                <span>Продажа</span>
            </div>

            <div onClick={() => changeItem('donate')} className={activeItem === 'donate' ? 'menu__item active' : 'menu__item'}>
                <span>Донаты</span>
            </div>

            <div onClick={() => changeItem('team')} className={activeItem === 'team' ? 'menu__item active' : 'menu__item'}>
                <span>Команды</span>
            </div>
        </div>
    );
};

export default ModeMenu;
