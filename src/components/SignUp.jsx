import React, { useState, useContext } from 'react'
import '../styles/Auth.css';
import { Context } from "../index";
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Error from '../components/UI/error/Error';


const SignUp = ({action}) => {
    const {store} = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(null);
    const timeout = 5000;

    const signUp = () => {
        if (name === '' || email === '' || password === '') {
            setIsError('Вы заполнили не все поля');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
        else {
            store.signup(name, email, password);
            setEmail('');
            setName('');
            setPassword('');
            action('close');
        }
	}

    const signIn = () => {
        setIsError(null);
        action('signIn');
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

            {isError &&
                <Error mode='error'>{isError}</Error>
            }

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }
        </div>
	);
}

export default SignUp;
