import React, { useState, useEffect, useRef } from 'react';
import UserService from '../API/UserService';
import { useLocation } from "react-router-dom";
import Snackbar from '../components/UI/snackbar/Snackbar';
import Modal from '../components/UI/modal/Modal'
import Follows from './Follows';
import Followings from './Followings';


const ParamsUser = ({countProjects, userID}) => {
    const location = useLocation();
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [follows, setFollows] = useState(0);
    const [followings, setFollowings] = useState(0);
    const [modalFollows, setModalFollows] = useState(false);
    const [modalFollowings, setModalFollowings] = useState(false);

    useEffect(() => {
        fetchData();
    }, [location.pathname])

    async function fetchData() {
        try {
            const response = await UserService.fetchDataParams(userID);

            if (response.data) {
                setFollowings(response.data.followings);
                setFollows(response.data.follows);
            }
        } catch (e) {
            showSnackbar('Ошибка при получение параметров профиля', 'error');
        }
    }

    const closeModalFollows = () => {
        setModalFollows(false);
    }

    const closeModalFollowings = () => {
        setModalFollowings(false);
    }

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
        snackbarRef.current.show();
    }

    return (
        <div className="profile__params">
            <div className="params__item">
                <p>Проектов</p>
                <p>{countProjects}</p>
            </div>

            <div onClick={() => setModalFollows(true)} className="params__item">
                <p>Подписчиков</p>
                <p>{follows}</p>
            </div>

            <div onClick={() => setModalFollowings(true)} className="params__item">
                <p>Подписок</p>
                <p>{followings}</p>
            </div>

            <Modal title='Подписчики' visible={modalFollows} setVisible={setModalFollows}>
                <Follows userID={userID} action={closeModalFollows} />
            </Modal>

            <Modal title='Подписки' visible={modalFollowings} setVisible={setModalFollowings}>
                <Followings userID={userID} action={closeModalFollowings} />
            </Modal>

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default ParamsUser;
