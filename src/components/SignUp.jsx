import React, { useState, useContext, useRef } from 'react'
import '../styles/Auth.scss';
import { Context } from "../index";
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Snackbar from '../components/UI/snackbar/Snackbar';


const SignUp = ({action}) => {
    const {store} = useContext(Context);
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        if (name === '' || email === '' || password === '')
            showSnackbar('Вы заполнили не все поля', 'error');
        else {
            store.signup(name, email, password);
            setEmail('');
            setName('');
            setPassword('');
            action('close');
        }
	}

    const signIn = () => {
        action('signIn');
    }

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
        snackbarRef.current.show();
    }

    return (
        <div className='auth'>
            <Input 
                value={name} 
                onChange={e => setName(e.target.value)}    
                placeholder='Имя и фамилия' 
            />
            <br/>
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
            <Button mode='fill' onClick={signUp}>Зарегестрироваться</Button>
            <p>Есть аккаунт? <span onClick={signIn}>Войти</span></p>

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
	);
}

export default SignUp;
