import React, { useState, useEffect } from 'react';
import '../styles/Tape.scss';
import { useLocation } from "react-router-dom";
import UserService from '../API/UserService';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import ListUsers from './ListUsers';


const Followings = ({userID, action}) => {
    const location = useLocation();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        fetchData();
    }, [location.pathname])

    async function fetchData() {
        try {
            const response = await UserService.fetchFollowings(userID);
            
            if (response.data) {
                setFollowings(response.data);
            }
        } catch (e) {
            setIsError('Ошибка при получение подписок');
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
        <div className="followings">
            {followings.length === 0
                ? <p className="empty">Нет подписок</p>
                : <ListUsers users={followings} action={action} />
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Followings;
