import React, { useState, useEffect, useContext, useRef } from 'react'
import { Context } from "../index";
import '../styles/Favorites.scss';
import ProjectService from '../API/ProjectService';
import Snackbar from '../components/UI/snackbar/Snackbar';
import Loader from '../components/UI/loader/Loader';
import ListProjects from '../components/ListProjects';


const Favorite = () => {
    const {store} = useContext(Context);
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, [])

    async function fetchProjects() {
        try {
            const response = await ProjectService.fetchFavoritesProjects(store.isUserID);

            if (response.data)
                setProjects(response.data);
        } catch (e) {
            showSnackbar('Ошибка при получении проектов', 'error');
        } finally {
            setIsLoading(false);
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
        <div className='favorites'>
            {projects.length !== 0
                ? <ListProjects projects={projects} />
                : <p className='empty'>У вас нет избранных проектов</p>
            }

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default Favorite;
