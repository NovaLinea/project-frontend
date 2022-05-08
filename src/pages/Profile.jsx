import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../index";
import '../styles/Profile.scss';
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation()
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState("");
    const [projects, setProjects] = useState([]);
    const [modeSubscribe, setModeSubscribe] = useState(false);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        fetchData();
        fetchProjects();

        if (store.isAuth)
            fetchFollowings();
    }, [location.pathname])

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

    async function fetchFollowings() {
        try {
            const responce = await UserService.fetchListFollowings(store.isUserID);

            if (responce.data) {
                setFollowings(responce.data);

                if (responce.data.indexOf(params.userID) != -1)
                    setModeSubscribe(true)
            }
        } catch (e) {
            setIsError('Ошибка при получении подписок');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    async function subscribeUser() {
        try {
            if (store.isAuth) {
                if (followings.indexOf(params.userID) != -1) {
                    const temp = [...followings];
                    temp.splice(params.userID.id, 1);
                    setFollowings(temp);
                    setModeSubscribe(false);
                    await UserService.unsubscribeUser(store.isUserID, params.userID);
                }
                else {
                    setFollowings([...followings, params.userID]);
                    setModeSubscribe(true);
                    await UserService.subscribeUser(store.isUserID, params.userID);
                }
            }
            else {
                setIsError('Вы не авторизированы в системе');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
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
                    {store.isAuth &&
                        <>
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
                        </>
                    }
                </div>
            </div>

            <ParamsUser countProjects={projects.length} userID={params.userID} />

            <div className="profile__content">
                {projects.length === 0
                    ? <p className='empty'>К сожалению у вас еще нет проектов</p>
                    : <ListProjects projects={projects} />
                }
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
