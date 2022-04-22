import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import * as FaIcons from "react-icons/fa"
import Button from "./UI/button/Button"


const Header = () => {
    return (
        <div className='header'>
            <div className="header__left">
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars/>
                </Link>
                
                <Link to='/' className='logo__link'>
                    <div className="logo">PU</div>
                    <b className='name'>ProjectUnion</b>
                </Link>
            </div>

            <div className="header__right">
                <Button mode='outline'>Регистрация</Button>
                <Button mode='fill'>Вход</Button>
            </div>
        </div>
    );
};

export default Header;
