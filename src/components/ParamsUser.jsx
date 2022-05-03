import React, { useState, useEffect } from 'react';
import UserService from '../API/UserService';
import { useLocation } from "react-router-dom";
import Error from '../components/UI/error/Error';
import Modal from '../components/UI/modal/Modal'
import Follows from './Follows';
import Followings from './Followings';


const ParamsUser = ({countProjects, userID}) => {
    const location = useLocation();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
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
            setIsError('Ошибка при получение параметров профиля');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    const closeModalFollows = () => {
        setModalFollows(false);
    }

    const closeModalFollowings = () => {
        setModalFollowings(false);
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

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default ParamsUser;
