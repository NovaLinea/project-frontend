import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../index";
import '../styles/Profile.scss';
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../API/UserService';
import ProjectService from '../API/ProjectService';
import { FiEdit2 } from "react-icons/fi";
import Button from "../components/UI/button/Button";
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import ListProjects from '../components/ListProjects';


const Profile = () => {
    const {store} = useContext(Context)
    const params = useParams();
    const navigate = useNavigate();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataUser, setDataUser] = useState("");
    const [projects, setProjects] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [likes, setLikes] = useState([]);
    const [follows, setFollows] = useState(0);
    const [followings, setFollowings] = useState(0);

    useEffect(() => {
        fetchData();
        fetchProjects();
    }, [])

    async function fetchData() {
        try {
            const response = await UserService.fetchDataProfile(params.userID);
            
            if (response.data) {
                setDataUser(response.data);

                if (response.data.favorites !== null)
                    setFavorites(response.data.favorites);

                if (response.data.likes !== null)
                    setLikes(response.data.likes);

                if (response.data.follows !== null)
                    setFollows(response.data.follows.length);
                else
                    setFollows(0);

                if (response.data.followings !== null)
                    setFollowings(response.data.followings.length);
                else
                    setFollowings(0);
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
            const response = await ProjectService.fetchProjects(params.userID);
            if (response.data) {
                setProjects(response.data);
            }
        } catch (e) {
            setIsError('Ошибка при получении проектов');
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
                    <div className="img">

                    </div>
                    <div className="text">
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

            <div className="profile__params">
                <div className="params__item">
                    <p>Всего проектов</p>
                    <p>{projects.length}</p>
                </div>

                <div className="params__item">
                    <p>Избранных</p>
                    <p>{favorites.length}</p>
                </div>

                <div className="params__item">
                    <p>Подписчиков</p>
                    <p>{follows}</p>
                </div>

                <div className="params__item">
                    <p>Подписок</p>
                    <p>{followings}</p>
                </div>
            </div>

            <div className="profile__content">
                <ListProjects projects={projects} likes={likes} favorites={favorites} />
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
