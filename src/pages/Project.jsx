import React, { useEffect, useState, useContext, useRef } from 'react'
import { Context } from "../index";
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Tape.scss';
import '../styles/Project.scss';
import ProjectService from '../API/ProjectService';
import UserService from '../API/UserService';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineBookmark } from "react-icons/hi";
import { RiShareForwardLine } from "react-icons/ri";
import { BsBookmarkFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import Snackbar from '../components/UI/snackbar/Snackbar';
import Loader from '../components/UI/loader/Loader';
import Textarea from '../components/UI/textarea/Textarea';
import Button from '../components/UI/button/Button';
import { Dropdown, ProgressBar } from 'react-bootstrap';


const Project = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState({});
    const [time, setTime] = useState("");
    const [comment, setComment] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [likes, setLikes] = useState([]);
    const [countLikes, setCountLikes] = useState(project.likes);
    const [modeLike, setModeLike] = useState(false);
    const [modeFavorite, setModeFavorite] = useState(false);

    useEffect(() => {
        getDataProject();
    }, [])

    async function getDataProject() {
        try {
            const response = await ProjectService.getDataProject(params.projectID);

            if (response.data) {
                setProject(response.data);
                setCountLikes(response.data.likes);
                determinateTime(response.data.time);

                if (store.isAuth) {
                    fetchLikesFavorites(response.data.id);
                }
            }
        } catch (e) {
            showSnackbar('Ошибка при получении данных проекта', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchLikesFavorites(projectID) {
        try {
            const response = await UserService.fetchLikesFavorites(store.isUserID);
            
            if (response.data) {
                if (response.data.favorites !== null)
                    setFavorites(response.data.favorites);

                if (response.data.likes !== null)
                    setLikes(response.data.likes);

                if (response.data.likes.indexOf(projectID) !== -1)
                    setModeLike(true);

                if (response.data.favorites.indexOf(projectID) !== -1)
                    setModeFavorite(true);
            }
            
        } catch (e) {
            showSnackbar('Ошибка при получении данных о лайках и избранном', 'error');
        }
    }

    async function likeProject() {
        try {
            if (store.isAuth) {
                if (likes.indexOf(project.id) !== -1) {
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
            else
                showSnackbar('Вы не авторизованы в системе', 'error');
        } catch (e) {
            showSnackbar('Ошибка при изменении данных в БД', 'error');
        }
    }

    async function favoriteProject() {
        try {
            if (store.isAuth) {
                if (favorites.indexOf(project.id) !== -1) {
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
            else
                showSnackbar('Вы не авторизованы в системе', 'error');
        } catch (e) {
            showSnackbar('Ошибка при добавлении проект в избранное', 'error');
        }
    }

    async function deleteProject() {
        try {
            await ProjectService.deleteProject(project.id);
            navigate('/');
        } catch (e) {
            showSnackbar('Ошибка при удалени проекта', 'error');
        }
    }

    const determinateTime = (projectTime) => {
        const countTime = Math.round((new Date() - new Date(projectTime)) / (1000 * 60));
        
        if (countTime < 60) {
            setTime(String(countTime) + " мин");
        }
        else if (Math.round(countTime / 60) < 24) {
            if (Math.round(countTime / 60) === 1 || Math.round(countTime / 60) === 21) {
                setTime(Math.round(countTime / 60) + " час")
            }
            else if (Math.round(countTime / 60) === 2 || Math.round(countTime / 60) === 3 || Math.round(countTime / 60) === 4 || Math.round(countTime / 60) === 22 || Math.round(countTime / 60) === 23) {
                setTime(Math.round(countTime / 60) + " часа");
            }
            else {
                setTime(Math.round(countTime / 60) + " часов");
            }
        }
        else if (Math.round(countTime / 60) < 48) {
            setTime("вчера");
        }
        else {
            setTime(new Date(projectTime).toDateString().substring(4));
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
        <div className="projects">
            <div className='project'>
                <div className="project__header">
                    <div className="main__data">
                        <div className="person">
                            <div className="photo"></div>
                            <Link to={`/profile/${project.user_id}`} className="name">{project.name_creator}</Link>

                            <div className='type'>
                                {project.type === 'sale'
                                    ? <span>Продажа</span>
                                    :
                                    project.type === 'donates'
                                        ? <span>Сбор донатов</span>
                                        : <span>Набор команды</span>
                                }
                            </div>
                            
                            <div className="time">{time}</div>
                        </div>
                        <Dropdown className='dropdown'>
                            <Dropdown.Toggle variant="light" className='dropdown__btn'>
                                <div className='menu__icon'>
                                    <BsThreeDots/>
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="light" className='actions'>
                                <Dropdown.Item className='action__item'>
                                    Пожаловаться
                                </Dropdown.Item>
                                
                                {store.isUserID === project.user_id &&
                                    <>
                                        <Dropdown.Item className='action__item'>
                                            Редактировать
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => deleteProject()} className='action__item delete'>
                                            Удалить
                                        </Dropdown.Item>
                                    </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="heading">
                        <p className="title">{project.name}</p>
                        {project.type === 'sale' &&
                            <p className="price">{project.price}₽</p>
                        }
                    </div>
                </div>

                <div className="project__body">
                    <p className="description description-open">{project.description}</p>

                    {project.type === 'donates' &&
                        <div className='donates'>
                            {project.price === project.progress
                                ? <ProgressBar variant='success' className='progress-donates' now={100} label={project.price}  />
                                : <ProgressBar variant='app-blue' className='progress-donates' max={project.price} now={project.progress} label={project.progress}  />
                            }

                            <div className="borders">
                                <p className='start'>0</p>
                                <p className='end'>{project.price}</p>
                            </div>

                            <Button mode='fill'>Задонатить</Button>
                        </div>
                    }

                    {project.type === 'team' &&
                        <div className='necessary__staff'>
                            <p className='title'>Требуются в команду:</p>
                            <ul className='list__staff'>
                                {project.staff.map(staff => 
                                    <li className='staff__item'>{staff}</li>
                                )}
                            </ul>
                            <Button mode='fill'>Подать заявку</Button>
                        </div>
                    }
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
                        
                        {modeFavorite
                            ? <BsBookmarkFill onClick={() => favoriteProject()} className='project__footer-icon'/>
                            : <HiOutlineBookmark onClick={() => favoriteProject()} className='project__footer-icon'/>
                        }
                    </div>

                    <div className="share">
                        <RiShareForwardLine className='project__footer-icon'/>
                    </div>
                </div>

                <hr />

                <div className="comments">
                    <p className='title'>Комментарии (count)</p>

                    <Textarea
                        placeholder="Написать комментарий..."
                        value={comment} 
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                
                <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
            </div>
        </div>
    );
};

export default Project;
