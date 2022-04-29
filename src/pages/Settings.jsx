import React, { useState, useEffect, useContext } from 'react'
import '../styles/Settings.scss';
import { Context } from "../index";
import UserService from '../API/UserService';
import Input from '../components/UI/input/Input';
import Textarea from '../components/UI/textarea/Textarea';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import Button from '../components/UI/button/Button';


const Settings = () => {
    const {store} = useContext(Context)
    const timeout = 5000;
    const autosave = 3000;
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        fetchData();
    }, [])

    /*useEffect(() => {
        setTimeout(() => {
            if (dataUser) {
                if (dataUser.name != name || dataUser.email != email || dataUser.description != description || dataUser.phone != phone) {
                    saveData();
                }
            }
        }, autosave);
    }, [name, email, description, phone])*/

    async function fetchData() {
        try {
            const response = await UserService.fetchData(store.isUserID);

            if (response.data) {
                setDataUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setDescription(response.data.description);
                setPhone(response.data.phone);
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

    async function saveData() {
        try {
            await UserService.saveData(store.isUserID, {name: name, email: email, description: description, phone: phone});
            setIsNotification('Настрйоки успешно сохранены');
            setTimeout(() => {
                setIsNotification(null)
            }, timeout)
        } catch (e) {
            setIsError('Ошибка при сохранении данных пользователя');
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
            <div className="settings__header">
                <b className='title'>Настройки профиля</b>
                <Button mode='fill' onClick={saveData}>Сохранить</Button>
            </div>

            <div className="settings__item">
                <p className='name'>Имя и фамилия</p>
                <Input
                    placeholder="Введите имя"
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="settings__item">
                <p className='name'>Почта</p>
                <Input
                    placeholder="Введите почту"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="settings__item">
                <p className='name'>Описание</p>
                <Textarea 
                    placeholder="Введите описание"
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="settings__item">
                <p className='name'>Номер телефона</p>
                <Input
                    placeholder="Введите номер"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
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
