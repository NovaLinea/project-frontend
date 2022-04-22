import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import '../styles/Sidebar.css';
import { AiOutlineFire, AiOutlineHome, AiOutlineOrderedList } from "react-icons/ai"
import { BiTimeFive, BiCategory } from "react-icons/bi"
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
                    <b>Популярное</b>
                </div>

                <div onClick={() => changeItem('new')} className={activeItem === 'new' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                    <BiTimeFive className='sidebar__list-item__icon'/>
                    <b>Свежее</b>
                </div>

                {store.isAuth &&
                    <div onClick={() => changeItem('home')} className={activeItem === 'home' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                        <AiOutlineHome className='sidebar__list-item__icon'/>
                        <b>Моя лента</b>
                    </div>
                }

                <div onClick={() => changeItem('categories')} className={activeItem === 'categories' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                    <BiCategory className='sidebar__list-item__icon'/>
                    <b>Категории</b>
                </div>

                {store.isAuth &&
                    <div onClick={() => changeItem('subs')} className={activeItem === 'subs' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                        <AiOutlineOrderedList className='sidebar__list-item__icon'/>
                        <b>Подписки</b>
                    </div>
                }

                {store.isAuth &&
                    <div onClick={() => changeItem('favorite')} className={activeItem === 'favorite' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                        <HiOutlineBookmark className='sidebar__list-item__icon'/>
                        <b>Избранное</b>
                    </div>
                }
            </div>
        </div>
    );
};

export default Sidebar;
