import React, { useState } from 'react'
import '../styles/Auth.css';
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Error from '../components/UI/error/Error';


const SignIn = ({signIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(null);
    const timeout = 5000;

    const signInUser = (e) => {
		e.preventDefault()

        if (email === '' || password === '') {
            setIsError('Вы заполнили не все поля');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
        else {
            const dataUser = {
                email, password, id: Date.now()
            }
            signIn(dataUser);
            setEmail('');
            setPassword('');
        }
	}

    const openSignUp = () => {
        signIn('signUp');
    }

    return (
        <>
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
                <Button mode='fill' onClick={signInUser}>Войти</Button>

                <p>Нет аккаунта? <span onClick={openSignUp}>Регистрация</span></p>
            </div>

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </>
	);
}

export default SignIn;
