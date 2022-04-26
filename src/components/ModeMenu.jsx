import React, { useState } from 'react'
import '../styles/ModeMenu.css';
import { MdAttachMoney } from "react-icons/md"
import { BiDonateHeart } from "react-icons/bi"
import { AiOutlineTeam } from "react-icons/ai"


const ModeMenu = () => {
    const [activeItem, setActiveItem] = useState('sale');

    const changeItem = (name) => {
        setActiveItem(name);
    }

    return (
        <div className="mode">
            <div className="menu__list">
                <div onClick={() => changeItem('sale')} className={activeItem === 'sale' ? 'menu__list-item active' : 'menu__list-item'}>
                    <MdAttachMoney className='menu__list-item__icon'/>
                    <span>Продажа</span>
                </div>

                <div onClick={() => changeItem('donate')} className={activeItem === 'donate' ? 'menu__list-item active' : 'menu__list-item'}>
                    <BiDonateHeart className='menu__list-item__icon'/>
                    <span>Донаты</span>
                </div>

                <div onClick={() => changeItem('team')} className={activeItem === 'team' ? 'menu__list-item active' : 'menu__list-item'}>
                    <AiOutlineTeam className='menu__list-item__icon'/>
                    <span>Команды</span>
                </div>
            </div>
        </div>
    );
};

export default ModeMenu;
