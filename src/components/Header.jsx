import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import {Context} from "../index";
import { AiOutlinePlus } from "react-icons/ai"
import { FaBars } from "react-icons/fa"
import Modal from '../components/UI/modal/Modal'
import Button from "./UI/button/Button"
import Input from "./UI/input/Input"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"


const Header = () => {
    const {store} = useContext(Context);
    const [modalSignUp, setModalSignUp] = useState(false);
    const [modalSignIn, setModalSignIn] = useState(false);


    const create = () => {

    }

    const signUpUser = (dataUser) => {
        setModalSignUp(false);

        if (dataUser == 'signIn') {
            setModalSignIn(true);
        }
        else {

        }
    }

    const signInUser = (dataUser) => {
        setModalSignIn(false);

        if (dataUser == 'signUp') {
            setModalSignUp(true);
        }
        else {

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
                    <Button mode='outline' onClick={create}>
                        <AiOutlinePlus className='create__icon'/>
                        Создать
                    </Button>
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
