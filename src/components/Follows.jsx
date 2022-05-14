import React, { useState, useEffect, useRef } from 'react';
import '../styles/Tape.scss';
import { useLocation } from "react-router-dom";
import UserService from '../API/UserService';
import Snackbar from '../components/UI/snackbar/Snackbar';
import Loader from '../components/UI/loader/Loader';
import ListUsers from './ListUsers';


const Follows = ({userID, action}) => {
    const location = useLocation();
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
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
            showSnackbar('Ошибка при получение подписчиков', 'error');
        } finally {
            setIsLoading(false);
        }
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
        <div className="follows">
            {follows.length === 0
                ? <p className="empty">Нет подписчиков</p>
                : <ListUsers users={follows} action={action} />
            }

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default Follows;
