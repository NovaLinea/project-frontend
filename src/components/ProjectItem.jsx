import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Tape.scss';
import { Context } from "../index";
import ProjectService from '../API/ProjectService';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { RiShareForwardLine } from "react-icons/ri";
import { BsBookmarkFill } from "react-icons/bs";
import Error from '../components/UI/error/Error';


const ProjectItem = ({project, listLikes, listFavorites}) => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [likes, setLikes] = useState([]);
    const [countLikes, setCountLikes] = useState(project.likes);
    const [modeLike, setModeLike] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [modeFavorite, setModeFavorite] = useState(false);

    useEffect(() => {
        if (listLikes.indexOf(project.id) != -1)
            setModeLike(true);
        else 
            setModeLike(false);

        setLikes(listLikes);
    }, [listLikes])

    useEffect(() => {
        if (listFavorites.indexOf(project.id) != -1)
            setModeFavorite(true);
        else 
            setModeFavorite(false);

        setFavorites(listFavorites);
    }, [listFavorites])

    async function likeProject() {
        try {
            if (store.isAuth) {
                if (likes.indexOf(project.id) != -1) {
                    setCountLikes(countLikes-1);
                    const temp = [...likes];
                    temp.splice(project.id, 1);
                    setLikes(temp);
                    setModeLike(false);
                    await ProjectService.dislikeProject(project.id, store.isUserID);
                }
                else {
                    setCountLikes(countLikes+1);
                    setLikes([...likes, project.id]);
                    setModeLike(true);
                    await ProjectService.likeProject(project.id, store.isUserID);
                }
            }
            else {
                setIsError('Вы не авторизованы в системе');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
        } catch (e) {
            setIsError('Ошибка при изменении данных в БД');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    async function favoriteProject() {
        try {
            if (store.isAuth) {
                if (favorites.indexOf(project.id) != -1) {
                    const temp = [...favorites];
                    temp.splice(project.id, 1);
                    setFavorites(temp);
                    setModeFavorite(false);
                    await ProjectService.removeFavoriteProject(project.id, store.isUserID);
                }
                else {
                    setFavorites([...favorites, project.id]);
                    setModeFavorite(true);
                    await ProjectService.favoriteProject(project.id, store.isUserID);
                }
            }
            else {
                setIsError('Вы не авторизованы в системе');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
        } catch (e) {
            setIsError('Ошибка при добавлении проект в избранное');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    return (
        <div className="project">
            <div className="project__header">
                <div className="from__data">
                    <div className="person">
                        <div className="photo"></div>
                        <Link to={`/profile/${project.user_id}`} className="name">{project.name_creator}</Link>
                    </div>
                    <div className="time">{project.time}</div>
                </div>

                <div className="heading">
                    <p className="title">{project.name}</p>
                    <p className="price">{project.price}₽</p>
                </div>
            </div>

            <div className="project__body">
                <p className="description">{project.description}</p>
            </div>

            <div className="project__footer">
                <div className="feedback">
                    <div className="likes feedback__item">
                        {modeLike
                            ? <AiFillHeart onClick={() => likeProject()} className='project__footer-icon'/>
                            : <AiOutlineHeart onClick={() => likeProject()} className='project__footer-icon'/>
                        }
                        <span>{countLikes}</span>
                    </div>

                    <div className="comments feedback__item">
                        <FaRegComment className='project__footer-icon'/>
                        {project.comments
                            ?
                            <span>{project.comments.length}</span>
                            :
                            <span>0</span>
                        }
                    </div>
                    
                    {modeFavorite
                        ? <BsBookmarkFill onClick={() => favoriteProject()} className='project__footer-icon'/>
                        : <HiOutlineBookmark onClick={() => favoriteProject()} className='project__footer-icon'/>
                    }
                </div>

                <div className="share">
                    <RiShareForwardLine className='project__footer-icon'/>
                </div>
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

export default ProjectItem;
