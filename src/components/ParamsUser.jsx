import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Tape.scss';
import UserService from '../API/UserService';
import Error from '../components/UI/error/Error';


const ParamsUser = ({countProjects, userID}) => {
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [follows, setFollows] = useState(0);
    const [followings, setFollowings] = useState(0);

    useEffect(() => {
        fetchData();
    }, [])

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

    return (
        <div className="profile__params">
            <div className="params__item">
                <p>Всего проектов</p>
                <p>{countProjects}</p>
            </div>

            <div className="params__item">
                <p>Подписчиков</p>
                <p>{follows}</p>
            </div>

            <Link to='/subs' className="params__item">
                <p>Подписок</p>
                <p>{followings}</p>
            </Link>

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default ParamsUser;
