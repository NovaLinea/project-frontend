import React, { useState, useEffect, useRef } from 'react'
import '../styles/Tape.scss';
import ProjectService from '../API/ProjectService';
import Snackbar from '../components/UI/snackbar/Snackbar';
import ListProjects from '../components/ListProjects';


const Popular = () => {
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
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
            showSnackbar('Ошибка при получении проектов', 'error');
        }
    }

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
    }

    return (
        <div className='popular'>
            <ListProjects projects={projects} />

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default Popular;
