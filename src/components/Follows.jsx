import React, { useState, useEffect } from 'react';
import '../styles/Tape.scss';
import { useLocation } from "react-router-dom";
import UserService from '../API/UserService';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import ListUsers from './ListUsers';


const Follows = ({userID, action}) => {
    const location = useLocation();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        fetchData();
    }, [location.pathname])

    async function fetchData() {
        try {
            const response = await UserService.fetchFollows(userID);
            
            if (response.data) {
                setFollows(response.data);
            }
        } catch (e) {
            setIsError('Ошибка при получение подписчиков');
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
        <div className="follows">
            {follows.length === 0
                ? <p className="empty">Нет подписчиков</p>
                : <ListUsers users={follows} action={action} />
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Follows;
