import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import '../styles/Sidebar.css';
import { AiOutlineFire, AiOutlineHome, AiOutlineOrderedList, AiOutlinePlus, AiOutlineBell, AiOutlineTeam } from "react-icons/ai"
import { BiMessageRounded, BiDonateHeart } from "react-icons/bi"
import { HiOutlineBookmark } from "react-icons/hi"
import { MdAttachMoney } from "react-icons/md"
import { Dropdown } from "react-bootstrap"


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

            <div className="sidebar__action">
                {store.isAuth &&
                    <Dropdown className='dropdown'>
                        <Dropdown.Toggle variant="outline-dark" className='dropdown__btn'>
                            <AiOutlinePlus className='icon'/>
                            <span>Создать</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="light" className='actions'>
                            <Dropdown.Item className='action-item'>
                                <MdAttachMoney className='action-item__icon'/>
                                На продажу
                            </Dropdown.Item>
                            <Dropdown.Item className='action-item'>
                                <BiDonateHeart className='action-item__icon'/>
                                Сбор донатов
                            </Dropdown.Item>
                            <Dropdown.Item className='action-item'>
                                <AiOutlineTeam className='action-item__icon'/>
                                Набор команды
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
        </div>
    );
};

export default Sidebar;
