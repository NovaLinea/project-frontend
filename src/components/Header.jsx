import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { Context } from "../index";
import { AiOutlinePlus, AiOutlineBell, AiOutlineTeam } from "react-icons/ai"
import { MdAttachMoney } from "react-icons/md"
import { BiDonateHeart, BiExit, BiSearch } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FiSettings } from "react-icons/fi"
import Modal from '../components/UI/modal/Modal'
import Button from "./UI/button/Button"
import Input from "./UI/input/Input"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import { Dropdown } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";


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
        <Container fluid align-self-center className='header'>
            <Row>
                <Col md={3} className="header__left">
                    <Link to='/' className='logo__link'>
                        <div className="logo">PU</div>
                        <b className='name'>ProjectUnion</b>
                    </Link>
                </Col>

                <Col md={6} className="header__middle">
                    <Input placeholder='Поиск...'/>

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
                </Col>

                <Col md={3} className="header__right">
                    {!store.isAuth
                        ?
                        <>
                            <BiSearch className='search'/>
                            <Button mode='outline' onClick={() => setModalSignUp(true)}>Регистрация</Button>
                            <Button mode='fill' onClick={() => setModalSignIn(true)}>Вход</Button>
                        </>
                        :
                        <>
                            <AiOutlinePlus className='add'/>
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
                </Col>
            </Row>

            <Modal title='Регистрация' visible={modalSignUp} setVisible={setModalSignUp}>
                <SignUp action={signUp}/>
            </Modal>

            <Modal title='Вход' visible={modalSignIn} setVisible={setModalSignIn}>
                <SignIn action={signIn}/>
            </Modal>
        </Container>
    );
};

export default Header;
