import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { Context } from "../index";
import { AiOutlinePlus, AiOutlineBell, AiOutlineTeam } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
import { MdAttachMoney } from "react-icons/md"
import { BiDonateHeart, BiExit } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi"
import Modal from '../components/UI/modal/Modal'
import Button from "./UI/button/Button"
import Input from "./UI/input/Input"
import Error from '../components/UI/error/Error';
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import { Dropdown } from 'react-bootstrap';


const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const timeout = 5000;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [modalSignUp, setModalSignUp] = useState(false);
    const [modalSignIn, setModalSignIn] = useState(false);
    const [showNotifies, setShowNotifies] = useState(false);

    async function signUp(dataUser) {
        store.signup(dataUser.name, dataUser.email, dataUser.password);
    }

    async function signIn(dataUser) {
        store.signin(dataUser.email, dataUser.password);
    }

    async function logout() {
        store.logout();
        navigate('/');
    }

    const create = () => {

    }

    const signUpUser = (dataUser) => {
        setModalSignUp(false);

        if (dataUser === 'signIn') {
            setModalSignIn(true);
        }
        else {
            signUp(dataUser);
        }
    }

    const signInUser = (dataUser) => {
        setModalSignIn(false);

        if (dataUser === 'signUp') {
            setModalSignUp(true);
        }
        else {
            signIn(dataUser);
        }
    }

    return (
        <div className='header'>
            <div className="header__left">
                <Link to='#' className='menu-bars'>
                    <FaBars/>
                </Link>

                <Link to='/' className='logo__link'>
                    <div className="logo">PU</div>
                    <b className='name'>ProjectUnion</b>
                </Link>
            </div>

            <div className="header__middle">
                <Input placeholder='Поиск...'/>

                {store.isAuth &&
                    <Dropdown className='dropdown'>
                        <Dropdown.Toggle variant="outline-dark" className='dropdown__btn'>
                            <AiOutlinePlus className='icon'/>
                            Создать
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

            <div className="header__right">
                {!store.isAuth
                    ?
                    <>
                        <Button mode='outline' onClick={() => setModalSignUp(true)}>Регистрация</Button>
                        <Button mode='fill' onClick={() => setModalSignIn(true)}>Вход</Button>
                    </>
                    :
                    <>
                        <AiOutlineBell onClick={() => setShowNotifies(!showNotifies)} className='notifications'/>

                        <div className={showNotifies ? 'notifications__panel show' : 'notifications__panel'} onClickAway={() => setShowNotifies(false)}>
                            <p className="title">Уведомления</p>
                            <hr className='line'/>
                            <p>Пусто</p>
                        </div>

                        <Link to={`/${store.isUserID}`} className='profile__link'>
                            AI
                        </Link>

                        <Dropdown className='dropdown'>
                            <Dropdown.Toggle variant="light" className='dropdown__btn'>
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="light" className='actions'>
                                <Dropdown.Item className='action-item' onClick={() => navigate(`/${store.isUserID}`)}>
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
                <SignUp signUp={signUpUser}/>
            </Modal>

            <Modal title='Вход' visible={modalSignIn} setVisible={setModalSignIn}>
                <SignIn signIn={signInUser}/>
            </Modal>

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }
        </div>
    );
};

export default Header;
