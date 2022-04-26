import React, { useState, useContext } from 'react'
import '../styles/Auth.css';
import { Context } from "../index";
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Error from './UI/error/Error';


const SignIn = ({action}) => {
    const {store} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(null);
    const timeout = 5000;

    const signIn = () => {
        if (email === '' || password === '') {
            setIsError('Вы заполнили не все поля');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
        else {
            store.signin(email, password);
            setEmail('');
            setPassword('');
            action('close');
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
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
	);
}

export default SignIn;
