import React, { useState, useEffect } from 'react'
import '../styles/Tape.scss';
import ProjectService from '../API/ProjectService';
import Error from '../components/UI/error/Error';
import ListProjects from '../components/ListProjects';


const Popular = () => {
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetchProjects();
    }, [])

    async function fetchProjects() {
        try {
            const response = await ProjectService.fetchProjectsPopular();
            
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

    return (
        <div className='popular'>
            <ListProjects projects={projects} />

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Popular;
