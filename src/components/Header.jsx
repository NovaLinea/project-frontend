import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.scss';
import { Context } from "../index";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai"
import { BiExit, BiSearch } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi"
import Modal from '../components/UI/modal/Modal'
import Button from "./UI/button/Button"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import { Dropdown } from 'react-bootstrap';
import Badge from '@mui/material/Badge';


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
        <div className='header d-flex w100'>
            <div className="container d-flex justify-between align-center">
                <div className="header__left">
                    <Link to='/' className='logo fw-bold'>
                        ProjectUnion
                    </Link>
                </div>

                <div className="header__right d-flex justify-between align-center">
                    <BiSearch className='search fw-bold'/>
                    {!store.isAuth
                        ?
                        <Button mode='fill' onClick={() => setModalSignIn(true)}>Вход</Button>
                        :
                        <>
                            <Badge badgeContent={0} color="primary">
                                <AiOutlineBell onClick={() => setShowNotifies(!showNotifies)} className='notifications fw-bold'/>
                            </Badge>

                            <div className={showNotifies ? 'notifications__panel show' : 'notifications__panel'} onClick={() => setShowNotifies(false)}>
                                <p className="title">Уведомления</p>
                                <hr className='line'/>
                                <p>Пусто</p>
                            </div>

                            <Dropdown className='dropdown'>
                                <Dropdown.Toggle variant="light" className='dropdown__btn'>
                                    <div className='profile__icon'>
                                        <AiOutlineUser/>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="light" className='actions'>
                                    <Dropdown.Item className='action__item' onClick={() => navigate(`/profile/${store.isUserID}`)}>
                                        <CgProfile className='action__item-icon'/>
                                        Профиль
                                    </Dropdown.Item>
                                    <Dropdown.Item className='action__item' onClick={() => navigate('/settings')}>
                                        <FiSettings className='action__item-icon'/>
                                        Настройки
                                    </Dropdown.Item>
                                    <Dropdown.Item className='action__item logout' onClick={logout}>
                                        <BiExit className='action__item-icon'/>
                                        Выйти
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    }
                </div>
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
