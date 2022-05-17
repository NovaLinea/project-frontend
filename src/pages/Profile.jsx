import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context } from "../index";
import '../styles/Profile.scss';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserService from '../API/UserService';
import ProjectService from '../API/ProjectService';
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { BiImage } from "react-icons/bi";
import Button from "../components/UI/button/Button";
import Snackbar from '../components/UI/snackbar/Snackbar';
import Loader from '../components/UI/loader/Loader';
import ListProjects from '../components/ListProjects';
import ParamsUser from '../components/ParamsUser';
import Avatar from '@mui/material/Avatar';


const Profile = () => {
    const {store} = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation()
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState("");
    const [projects, setProjects] = useState([]);
    const [modeSubscribe, setModeSubscribe] = useState(false);
    const [followings, setFollowings] = useState([]);
    const [photo, setPhoto] = useState(null);

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
            showSnackbar('Ошибка при получении данных пользователя', 'error');
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
            showSnackbar('Ошибка при получении проектов', 'error');
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
            showSnackbar('Ошибка при получении подписок', 'error');
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
            else
                showSnackbar('Вы не авторизированы в системе', 'error');
        } catch (e) {
            showSnackbar('Ошибка при подписке на пользователя', 'error');
        }
    }

    const changePhoto = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setPhoto(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
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
        <div className='profile'>
            <div className="profile__card">
                <div className="information">
                    <div className="photo__user">
                        <Avatar 
                            className='photo' 
                            src={photo}
                            variant="square" 
                            sx={{ width: 100, height: 100 }}
                        />

                        <label title="Сменить фото" className="change__photo">
                            <input type="file" onChange={changePhoto} accept="image/png, image/jpeg" hidden="hidden" />
                            <BiImage />
                        </label>
                    </div>                    

                    <div className="text">
                        <h3 className="name">{dataUser.name}</h3>
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

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default Profile;
