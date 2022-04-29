import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import '../styles/Sidebar.scss';
import { AiOutlineFire, AiOutlineHome, AiOutlineOrderedList, AiOutlinePlus } from "react-icons/ai"
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
            <div onClick={() => changeItem('popular')} className={activeItem === 'popular' ? 'sidebar__item active' : 'sidebar__item'}>
                <AiOutlineFire className='sidebar__item-icon'/>
            </div>

            {store.isAuth &&
                <div onClick={() => changeItem('home')} className={activeItem === 'home' ? 'sidebar__item active' : 'sidebar__item'}>
                    <AiOutlineHome className='sidebar__item-icon'/>
                </div>
            }
            
            {store.isAuth &&
                <div onClick={() => changeItem('messages')} className={activeItem === 'messages' ? 'sidebar__item active' : 'sidebar__item'}>
                    <BiMessageRounded className='sidebar__item-icon'/>
                </div>
            }

            <div onClick={() => changeItem('subs')} className={activeItem === 'subs' ? 'sidebar__item active' : 'sidebar__item'}>
                <AiOutlineOrderedList className='sidebar__item-icon'/>
            </div>

            {store.isAuth &&
                <div onClick={() => changeItem('favorite')} className={activeItem === 'favorite' ? 'sidebar__item active' : 'sidebar__item'}>
                    <HiOutlineBookmark className='sidebar__item-icon'/>
                </div>
            }

            <div onClick={() => changeItem('create')} className={activeItem === 'create' ? 'sidebar__item active' : 'sidebar__item'}>
                <AiOutlinePlus className='sidebar__item-icon'/>
            </div>

        </div>
    );
};

export default Sidebar;
