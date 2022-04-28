import React, { useState, useEffect, useContext } from 'react';
import {Context} from "../index";
import '../styles/Profile.css';
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../API/UserService';
import { FiEdit2 } from "react-icons/fi";
import Button from "../components/UI/button/Button";
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';


const Profile = () => {
    const {store} = useContext(Context)
    const params = useParams();
    const navigate = useNavigate();
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
            const response = await UserService.fetchData(params.userID);

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
        <div className='profile'>
            <div className="profile__card">
                <div className="information">
                    <div className="information_img">

                    </div>
                    <div className="information__text">
                        <p className="name">{dataUser.name}</p>
                        <p className="description">{dataUser.description}</p>
                    </div>
                </div>
                <div className="action">
                    <Button mode='fill' onClick={() => navigate('/settings')}>
                        <FiEdit2 className='icon'/>
                        Редактировать
                    </Button>
                </div>
            </div>

            <div className="profile__content">
                <div className="projects">
                    
                </div>
                <div className="follows">
                    
                </div>
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

export default Profile;
