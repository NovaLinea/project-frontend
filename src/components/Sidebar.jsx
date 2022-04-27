import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import '../styles/Sidebar.css';
import { AiOutlineFire, AiOutlineHome, AiOutlineOrderedList } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import { HiOutlineBookmark } from "react-icons/hi"


const Sidebar = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('popular');


    const changeItem = (name) => {
        setActiveItem(name);
        navigate(`/${name}`);
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__list">
                <div onClick={() => changeItem('popular')} className={activeItem === 'popular' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                    <AiOutlineFire className='sidebar__list-item__icon'/>
                    <span>Популярное</span>
                </div>

                {store.isAuth &&
                    <div onClick={() => changeItem('home')} className={activeItem === 'home' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                        <AiOutlineHome className='sidebar__list-item__icon'/>
                        <span>Моя лента</span>
                    </div>
                }
                
                {store.isAuth &&
                    <div onClick={() => changeItem('messages')} className={activeItem === 'messages' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                        <BiMessageRounded className='sidebar__list-item__icon'/>
                        <span>Сообщения</span>
                    </div>
                }

                <div onClick={() => changeItem('subs')} className={activeItem === 'subs' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                    <AiOutlineOrderedList className='sidebar__list-item__icon'/>
                    <span>Подписки</span>
                </div>

                {store.isAuth &&
                    <div onClick={() => changeItem('favorite')} className={activeItem === 'favorite' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                        <HiOutlineBookmark className='sidebar__list-item__icon'/>
                        <span>Избранное</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default Sidebar;
