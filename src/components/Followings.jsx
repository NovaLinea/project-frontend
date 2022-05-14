import React, { useState, useEffect, useRef } from 'react';
import '../styles/Tape.scss';
import { useLocation } from "react-router-dom";
import UserService from '../API/UserService';
import Snackbar from '../components/UI/snackbar/Snackbar';
import Loader from '../components/UI/loader/Loader';
import ListUsers from './ListUsers';


const Followings = ({userID, action}) => {
    const location = useLocation();
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        fetchData();
    }, [location.pathname])

    async function fetchData() {
        try {
            const response = await UserService.fetchFollowings(userID);
            
            if (response.data)
                setFollowings(response.data);
        } catch (e) {
            showSnackbar('Ошибка при получение подписок', 'error');
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
        <div className="followings">
            {followings.length === 0
                ? <p className="empty">Нет подписок</p>
                : <ListUsers users={followings} action={action} />
            }

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default Followings;
