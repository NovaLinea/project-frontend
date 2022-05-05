import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../index";
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.scss';
import { AiOutlineFire, AiOutlineHome, AiOutlinePlus } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import { HiOutlineBookmark } from "react-icons/hi"
import { FiSettings } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"


const Sidebar = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation()
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveItem("popular");
        }
        else if (location.pathname.includes("profile")) {
            setActiveItem("profile");
        }
        else {
            setActiveItem(location.pathname.substring(1, location.pathname.length));
        }
    }, [location.pathname])

    return (
        <div className='sidebar'>
            <div onClick={() => navigate('/popular')} className={activeItem === 'popular' ? 'sidebar__item active' : 'sidebar__item'}>
                <AiOutlineFire className='sidebar__item-icon'/>
            </div>

            <div onClick={() => navigate('/home')} className={activeItem === 'home' ? 'sidebar__item active' : 'sidebar__item'}>
                <AiOutlineHome className='sidebar__item-icon'/>
            </div>
        
            <div onClick={() => navigate('/messages')} className={activeItem === 'messages' ? 'sidebar__item active' : 'sidebar__item'}>
                <BiMessageRounded className='sidebar__item-icon'/>
            </div>

            <div onClick={() => navigate('/favorite')} className={activeItem === 'favorite' ? 'sidebar__item active' : 'sidebar__item'}>
                <HiOutlineBookmark className='sidebar__item-icon'/>
            </div>

            <div onClick={() => navigate('/create')} className={activeItem === 'create' ? 'sidebar__item active' : 'sidebar__item'}>
                <AiOutlinePlus className='sidebar__item-icon'/>
            </div>
            
            <div onClick={() => navigate('/settings')} className={activeItem === 'settings' ? 'sidebar__item active' : 'sidebar__item'}>
                <FiSettings className='sidebar__item-icon'/>
            </div>

            <div onClick={() => navigate(`/profile/${store.isUserID}`)} className={activeItem === 'profile' ? 'sidebar__item active' : 'sidebar__item'}>
                <CgProfile className='sidebar__item-icon'/>
            </div>

        </div>
    );
};

export default Sidebar;
