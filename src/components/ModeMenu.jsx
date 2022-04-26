import React, { useState } from 'react'
import '../styles/ModeMenu.css';


const ModeMenu = () => {
    const [activeItem, setActiveItem] = useState('sale');

    const changeItem = (name) => {
        setActiveItem(name);
    }

    return (
        <div className="mode">
            <div className="menu__list">
                <div onClick={() => changeItem('sale')} className={activeItem === 'sale' ? 'menu__list-item active' : 'menu__list-item'}>
                    <span>Продажа</span>
                </div>

                <div onClick={() => changeItem('donate')} className={activeItem === 'donate' ? 'menu__list-item active' : 'menu__list-item'}>
                    <span>Донаты</span>
                </div>

                <div onClick={() => changeItem('team')} className={activeItem === 'team' ? 'menu__list-item active' : 'menu__list-item'}>
                    <span>Команды</span>
                </div>
            </div>
        </div>
    );
};

export default ModeMenu;
