import React, { useState } from 'react'
import '../styles/Auth.css';
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import Error from '../components/UI/error/Error';


const SignUp = ({signUp}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(null);
    const timeout = 5000;

    const signUpUser = (e) => {
		e.preventDefault()

        if (name === '' || email === '' || password === '') {
            setIsError('Вы заполнили не все поля');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
        else {
            const dataUser = {
                email, name, password, id: Date.now()
            }
            signUp(dataUser);
            setEmail('');
            setName('');
            setPassword('');
        }
	}

    const openSignIn = () => {
        signUp('signIn');
    }

    return (
        <>
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
                <Button mode='fill' onClick={signUpUser}>Зарегестрироваться</Button>

                <p>Есть аккаунт? <span onClick={openSignIn}>Войти</span></p>
            </div>

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </>
	);
}

export default SignUp;
