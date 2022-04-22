import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"


const Sidebar = () => {
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
                    <AiIcons.AiFillFire className='sidebar__list-item__icon'/>
                    <b>Популярное</b>
                </div>

                <div onClick={() => changeItem('new')} className={activeItem === 'new' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                    <BiIcons.BiTimeFive className='sidebar__list-item__icon'/>
                    <b>Свежее</b>
                </div>

                <div onClick={() => changeItem('categories')} className={activeItem === 'categories' ? 'sidebar__list-item active' : 'sidebar__list-item'}>
                    <BiIcons.BiCategory className='sidebar__list-item__icon'/>
                    <b>Категории</b>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
