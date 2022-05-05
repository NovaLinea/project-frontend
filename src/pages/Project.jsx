import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../styles/Project.scss';
import ProjectService from '../API/ProjectService';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import Textarea from '../components/UI/textarea/Textarea';


const Project = () => {
    const params = useParams();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState({});
    const [time, setTime] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        getDataProject();
    }, [])

    async function getDataProject() {
        try {
            const response = await ProjectService.getDataProject(params.projectID);

            if (response.data) {
                setProject(response.data);
                determinateTime(response.data.time);
            }
        } catch (e) {
            setIsError('Ошибка при получении данных проекта');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        } finally {
            setIsLoading(false);
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

    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                <Loader/>
            </div>
        );
    }

    return (
        <div className='project'>
            <div className="project__header">
                <div className="from__data">
                    <div className="person">
                        <div className="photo"></div>
                        <Link to={`/profile/${project.user_id}`} className="name">{project.name_creator}</Link>
                    </div>
                    <div className="time">{time}</div>
                </div>

                <div className="heading">
                    <p className="title">{project.name}</p>
                    <p className="price">{project.price}₽</p>
                </div>
            </div>

            <div className="project__body">
                <p className="description">{project.description}</p>
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
            
            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Project;
