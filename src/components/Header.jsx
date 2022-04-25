import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { Context } from "../index";
import { AiOutlinePlus, AiOutlineBell, AiOutlineTeam } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { MdAttachMoney } from "react-icons/md"
import { BiDonateHeart } from "react-icons/bi"
import Modal from '../components/UI/modal/Modal'
import Button from "./UI/button/Button"
import Input from "./UI/input/Input"
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
        try {
            setIsLoading(true);
            store.signup(dataUser.name, dataUser.email, dataUser.password);
        } catch (e) {
            setIsError('Ошибка при регистрации');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        } finally {
            setIsLoading(false);
        }
    }

    async function signIn(dataUser) {
        try {
            setIsLoading(true);
            store.signin(dataUser.email, dataUser.password);
        } catch (e) {
            setIsError('Ошибка при входе');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        } finally {
            setIsLoading(false);
        }
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

    const profile = () => {
        navigate(`/${'userID'}`);
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
                    <Dropdown className='create list-status'>
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                            <AiOutlinePlus className='create__icon'/>
                            Создать
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="light" className='create__action'>
                            <Dropdown.Item className='create__action-item'>
                                <MdAttachMoney className='create__action-item__icon'/>
                                На продажу
                            </Dropdown.Item>
                            <Dropdown.Item className='create__action-item'>
                                <BiDonateHeart className='create__action-item__icon'/>
                                Сбор донатов
                            </Dropdown.Item>
                            <Dropdown.Item className='create__action-item'>
                                <AiOutlineTeam className='create__action-item__icon'/>
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

                        <Link to={`/${'userID'}`} className='profile__link'>
                            AI
                        </Link>
                        <IoIosArrowDown className='arrow-down'/>
                    </>
                }
            </div>

            <Modal title='Регистрация' visible={modalSignUp} setVisible={setModalSignUp}>
                <SignUp signUp={signUpUser}/>
            </Modal>

            <Modal title='Вход' visible={modalSignIn} setVisible={setModalSignIn}>
                <SignIn signIn={signInUser}/>
            </Modal>
        </div>
    );
};

export default Header;
