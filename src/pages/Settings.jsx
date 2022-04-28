import React, { useState, useEffect, useContext } from 'react'
import '../styles/Settings.css';
import { Context } from "../index";
import UserService from '../API/UserService';
import Input from '../components/UI/input/Input';
import Textarea from '../components/UI/textarea/Textarea';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';


const Settings = () => {
    const {store} = useContext(Context)
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await UserService.fetchData(store.isUserID);

            if (response.data) {
                setDataUser(response.data);
            }
            
        } catch (e) {
            setIsError('Ошибка при получении данных пользователя');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                <Loader/>
            </div>
        );
    }

    return (
        <div className='settings'>
            <p className='title'>Настройки профиля</p>

            <div className="settings__item">
                <p className='name'>Имя и фамилия</p>
                <Input placeholder="Введите имя..." value={dataUser.name} />
            </div>

            <div className="settings__item">
                <p className='name'>Почта</p>
                <Input placeholder="Введите почту..." value={dataUser.email} />
            </div>

            <div className="settings__item">
                <p className='name'>Описание</p>
                <Textarea placeholder="Введите описание..." value={dataUser.description} />
            </div>

            <div className="settings__item">
                <p className='name'>Номер телефона</p>
                <Input placeholder="Введите номер..." value={dataUser.phone} />
            </div>

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }

            {isNotification &&
                <Error mode='success'>{isNotification}</Error>
            }
        </div>
    );
};

export default Settings;
