import React, { useState, useEffect, useContext, useRef } from 'react'
import '../styles/Settings.scss';
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import UserService from '../API/UserService';
import Input from '../components/UI/input/Input';
import Textarea from '../components/UI/textarea/Textarea';
import Snackbar from '../components/UI/snackbar/Snackbar';
import Loader from '../components/UI/loader/Loader';
import Button from '../components/UI/button/Button';
import Modal from '../components/UI/modal/Modal'
import Toggle from '../components/UI/toggle/Toggle';
import ConfirmAction from '../components/ConfirmAction';


const Settings = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ntfsNewMsg, setNftsNewMsg] = useState(false);
    const [ntfsNewSubs, setNftsNewSubs] = useState(false);
    const [ntfsNewComment, setNftsNewComment] = useState(false);
    const [ntfsUpdate, setNftsUpdate] = useState(false);
    const [ntfsEmail, setNftsEmail] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [counterName, setCounterName] = useState(0);
    const [counterDescription, setCounterDescription] = useState(0);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            setIsLoading(true);
            const response = await UserService.fetchDataSettings(store.isUserID);
            
            if (response.data) {
                setDataUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setDescription(response.data.description);
                setCounterName(response.data.name.length);
                setCounterDescription(response.data.description.length);

                if (response.data.notifications) {
                    setNftsNewMsg(response.data.notifications.new_message);
                    setNftsNewSubs(response.data.notifications.new_sub);
                    setNftsNewComment(response.data.notifications.new_comment);
                    setNftsUpdate(response.data.notifications.update);
                    setNftsEmail(response.data.notifications.email_notification);
                }
            }
            
        } catch (e) {
            showSnackbar('Ошибка при получении настроек', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function saveData() {
        try {
            await UserService.saveData(store.isUserID, name, email, description, ntfsNewMsg, ntfsNewSubs, ntfsNewComment, ntfsUpdate, ntfsEmail);
            showSnackbar('Настройки успешно сохранены', 'success');
        } catch (e) {
            showSnackbar('Ошибка при сохранении данных пользователя', 'error');
        }
    }

    async function changePassword() {
        try {
            if (newPassword === "" || oldPassword === "" || confirmPassword === "")
                showSnackbar('Вы заполнили не все поля', 'error');
            else if (newPassword !== confirmPassword)
                showSnackbar('Новые пароли не совпадают', 'error');
            else if (newPassword === oldPassword)
                showSnackbar('Новые пароли не отличается от старого', 'error');
            else {
                await UserService.changePassword(store.isUserID, oldPassword, newPassword);

                showSnackbar('Пароль успешно изменен', 'success');
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (e) {
            showSnackbar('Ошибка при изменении пароля', 'error');
        }
    }

    async function deleteAccount() {
        try {
            await UserService.deleteAccount(store.isUserID);

            store.logout();
            navigate("/")
        } catch (e) {
            showSnackbar('Ошибка при удалении аккаунта', 'error');
        }
    }

    const confirmDelete = (choice) => {
        setModalConfirm(false);
        if (choice) {
            deleteAccount();
        }
    }

    const changeName = (e) => {
        setName(e.target.value);
        setCounterName(e.target.value.length);
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
        setCounterDescription(e.target.value.length);
    }

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
        snackbarRef.current.show();
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

            <div className="main-settings">
                <p className="title">Основные настройки</p>

                <div className="settings__item">
                    <p className='name'>Имя и фамилия (<span className="current">{30-counterName})</span></p>
                    <Input
                        placeholder="Введите имя"
                        maxLength="30"
                        value={name} 
                        onChange={e => changeName(e)}
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
                    <p className='name'>Описание (<span className="current">{150-counterDescription})</span></p>
                    <Textarea 
                        placeholder="Введите описание"
                        maxLength={150}
                        value={description} 
                        onChange={e => changeDescription(e)}
                    />
                </div>
            </div>

            <div className="change-password">
                <p className='title'>Изменение пароля</p>

                <Input
                    type="password"
                    placeholder="Введите старый пароль"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Повторите новый пароль"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <Button mode='fill' onClick={changePassword}>Изменить пароль</Button>
            </div>

            <div className="notifications">
                <p className='title'>Уведомления</p>

                <Toggle 
                    text="Новые сообщения" 
                    status={ntfsNewMsg && "checked"}
                    change={() => setNftsNewMsg(!ntfsNewMsg)}
                />

                <Toggle 
                    text="Новые подписчики"
                    status={ntfsNewSubs && "checked"}
                    change={() => setNftsNewSubs(!ntfsNewSubs)}
                />

                <Toggle 
                    text="Новые комментарии к проектам"
                    status={ntfsNewComment && "checked"}
                    change={() => setNftsNewComment(!ntfsNewComment)}
                />

                <Toggle
                    text="Обновления платформы"
                    status={ntfsUpdate && "checked"}
                    change={() => setNftsUpdate(!ntfsUpdate)}
                />

                <Toggle
                    text="Уведомления на почту"
                    status={ntfsEmail && "checked"}
                    change={() => setNftsEmail(!ntfsEmail)}
                />
            </div>

            <div className="delete-account">
                <p onClick={() => setModalConfirm(true)}>Удалить аккаунт</p>
            </div>

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />

            <Modal title='Удаление аккаунта' visible={modalConfirm} setVisible={setModalConfirm}>
                <ConfirmAction text="Вы уверены, что хотите удалить аккаунт и все свои проекты?" action={confirmDelete}/>
            </Modal>
        </div>
    );
};

export default Settings;
