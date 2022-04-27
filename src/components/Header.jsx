import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { Context } from "../index";
import { AiOutlineBell } from "react-icons/ai"
import { BiDonateHeart, BiExit, BiSearch } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi"
import Modal from '../components/UI/modal/Modal'
import Button from "./UI/button/Button"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import { Dropdown } from 'react-bootstrap';


const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [modalSignUp, setModalSignUp] = useState(false);
    const [modalSignIn, setModalSignIn] = useState(false);
    const [showNotifies, setShowNotifies] = useState(false);

    async function logout() {
        store.logout();
        navigate('/');
    }

    const create = () => {

    }

    const signUp = (dataAction) => {
        setModalSignUp(false);
        if (dataAction === 'signIn') {
            setModalSignIn(true);
        }
    }

    const signIn = (dataAction) => {
        setModalSignIn(false);
        if (dataAction === 'signUp') {
            setModalSignUp(true);
        }
    }

    return (
        <div className='header'>
            <div className="header__left">
                <Link to='/' className='logo__link'>
                    <div className="logo">PU</div>
                    <b className='name'>ProjectUnion</b>
                </Link>
            </div>

            <div className="header__right">
                {!store.isAuth
                    ?
                    <>
                        <BiSearch className='search'/>
                        <Button mode='outline' onClick={() => setModalSignUp(true)}>Регистрация</Button>
                        <Button mode='fill' onClick={() => setModalSignIn(true)}>Вход</Button>
                    </>
                    :
                    <>
                        <BiSearch className='search'/>
                        <AiOutlineBell onClick={() => setShowNotifies(!showNotifies)} className='notifications'/>

                        <div className={showNotifies ? 'notifications__panel show' : 'notifications__panel'} onClickAway={() => setShowNotifies(false)}>
                            <p className="title">Уведомления</p>
                            <hr className='line'/>
                            <p>Пусто</p>
                        </div>

                        <Link to={`/profile/${store.isUserID}`} className='profile__link'>
                            AI
                        </Link>

                        <Dropdown className='dropdown'>
                            <Dropdown.Toggle variant="light" className='dropdown__btn'>
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="light" className='actions'>
                                <Dropdown.Item className='action-item' onClick={() => navigate(`/profile/${store.isUserID}`)}>
                                    <CgProfile className='action-item__icon'/>
                                    Профиль
                                </Dropdown.Item>
                                <Dropdown.Item className='action-item' onClick={() => navigate('/donates')}>
                                    <BiDonateHeart className='action-item__icon'/>
                                    Донаты
                                </Dropdown.Item>
                                <Dropdown.Item className='action-item' onClick={() => navigate('/settings')}>
                                    <FiSettings className='action-item__icon'/>
                                    Настройки
                                </Dropdown.Item>
                                <Dropdown.Item className='action-item logout' onClick={logout}>
                                    <BiExit className='action-item__icon'/>
                                    Выйти
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                }
            </div>

            <Modal title='Регистрация' visible={modalSignUp} setVisible={setModalSignUp}>
                <SignUp action={signUp}/>
            </Modal>

            <Modal title='Вход' visible={modalSignIn} setVisible={setModalSignIn}>
                <SignIn action={signIn}/>
            </Modal>
        </div>
    );
};

export default Header;
