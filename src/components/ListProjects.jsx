import React, { useState, useEffect, useContext, useRef } from 'react'
import { Context } from "../index";
import UserService from '../API/UserService';
import ProjectItem from './ProjectItem';
import Loader from '../components/UI/loader/Loader';
import Snackbar from '../components/UI/snackbar/Snackbar';


const ListProjects = ({projects}) => {
    const {store} = useContext(Context);
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        if (store.isAuth)
            fetchLikesFavorites();
        else
            setIsLoading(false);
    }, [])

    async function fetchLikesFavorites() {
        try {
            const response = await UserService.fetchLikesFavorites(store.isUserID);
            
            if (response.data) {
                if (response.data.favorites !== null)
                    setFavorites(response.data.favorites);

                if (response.data.likes !== null)
                    setLikes(response.data.likes);
            }
            
        } catch (e) {
            showSnackbar('Ошибка при получении данных о лайках и избранном', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
    }

    if (isLoading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                <Loader/>
            </div>
        );
    }

    return (
        <div className='projects'>
            {projects.map(project => 
                <ProjectItem key={project.id} project={project} listLikes={likes} listFavorites={favorites} />
            )}

            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />
        </div>
    );
};

export default ListProjects;
