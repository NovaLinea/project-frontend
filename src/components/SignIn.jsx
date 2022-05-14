import React, { useState, useContext, useRef } from 'react'
import '../styles/Auth.scss';
import { Context } from "../index";
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Snackbar from '../components/UI/snackbar/Snackbar';


const SignIn = ({action}) => {
    const {store} = useContext(Context);
    const snackbarRef = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        if (email === '' || password === '') {
            snackbarRef.current.show('Вы заполнили не все поля', 'error');
        }
        else {
            const err = store.signin(email, password);

            if (err) {
                console.log(err);
                //snackbarRef.current.show(err, 'error');
            }
            setEmail('');
            setPassword('');
            //action('close');
        }
	}

    const signUp = () => {
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

            <Snackbar ref={snackbarRef} />
        </div>
	);
}

export default SignIn;
