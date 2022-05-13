import React, { useState, useContext, useRef } from 'react'
import '../styles/Auth.scss';
import { Context } from "../index";
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Error from './UI/error/Error';
import Snackbar from '../components/UI/error/Snackbar';


const SignIn = ({action}) => {
    const {store} = useContext(Context);
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(null);
    const timeout = 5000;

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
        snackbarRef.current.show();
    }

    const signIn = () => {
        if (email === '' || password === '') {
            showSnackbar('Вы заполнили не все поля', 'error');
        }
        else {
            store.signin(email, password);
            setEmail('');
            setPassword('');
            //action('close');
        }
	}

    const signUp = () => {
        setIsError(null);
        action('signUp');
    }

    return (
        <div className='auth'>
            <Input 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder='Почта' 
            />
            <br/>
            <Input 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                type='password'
                placeholder='Пароль' 
            />
            <br/>
            <Button mode='fill' onClick={signIn}>Войти</Button>

            <p>Нет аккаунта? <span onClick={signUp}>Регистрация</span></p>

            {store.isError &&
                <Snackbar ref={snackbarRef} message={store.isError} mode="error" />
            }

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
	);
}

export default SignIn;
