import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../index";
import '../styles/Profile.scss';
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../API/UserService';
import ProjectService from '../API/ProjectService';
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import Button from "../components/UI/button/Button";
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import ListProjects from '../components/ListProjects';
import ParamsUser from '../components/ParamsUser';


const Profile = () => {
    const {store} = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState("");
    const [projects, setProjects] = useState([]);
    const [modeSubscribe, setModeSubscribe] = useState(false);

    useEffect(() => {
        fetchData();
        fetchProjects();
    }, [])

    async function fetchData() {
        try {
            const response = await UserService.fetchDataProfile(params.userID);
            
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

    async function fetchProjects() {
        try {
            const response = await ProjectService.fetchProjectsUser(params.userID);
            if (response.data) {
                setProjects(response.data);
            }
        } catch (e) {
            setIsError('Ошибка при получении проектов');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    async function subscribeUser() {
        try {
            await UserService.subscribeUser(store.isUserID, params.userID);
        } catch (e) {
            setIsError('Ошибка при подписке на пользователя');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
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
                    <div className="img">

                    </div>
                    <div className="text">
                        <p className="name">{dataUser.name}</p>
                        <p className="description">{dataUser.description}</p>
                    </div>
                </div>
                <div className="action">
                    {store.isUserID === params.userID
                        ?
                        <Button mode='fill' onClick={() => navigate('/settings')}>
                            <FiEdit2 className='icon'/>
                            Редактировать
                        </Button>
                        :
                        modeSubscribe
                            ?
                            <Button mode='outline' onClick={() => subscribeUser()}>
                                <FcCheckmark className='icon'/>
                                Подписан
                            </Button>
                            :
                            <Button mode='fill' onClick={() => subscribeUser()}>
                                <AiOutlineUserAdd className='icon'/>
                                Подписаться
                            </Button>
                    }
                </div>
            </div>

            <ParamsUser countProjects={projects.length} userID={params.userID} />

            <div className="profile__content">
                <ListProjects projects={projects} />
            </div>

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Profile;
