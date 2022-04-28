import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import '../styles/Sidebar.css';
import { AiOutlineFire, AiOutlineHome, AiOutlineOrderedList, AiOutlinePlus } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import { HiOutlineBookmark } from "react-icons/hi"
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi"


const Sidebar = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('popular');


    const changeItem = (name) => {
        setActiveItem(name);

        if (name === "profile")
            navigate(`/${name}/${store.isUserID}`);
        else
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

            {store.isAuth &&
                <div onClick={() => changeItem('profile')} className={activeItem === 'profile' ? 'sidebar__item active' : 'sidebar__item'}>
                    <CgProfile className='sidebar__item-icon'/>
                </div>
            }

            {store.isAuth &&
                <div onClick={() => changeItem('settings')} className={activeItem === 'settings' ? 'sidebar__item active' : 'sidebar__item'}>
                    <FiSettings className='sidebar__item-icon'/>
                </div>
            }

        </div>
    );
};

export default Sidebar;
