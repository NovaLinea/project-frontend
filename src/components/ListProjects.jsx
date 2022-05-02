import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../index";
import UserService from '../API/UserService';
import ProjectItem from './ProjectItem';
import Loader from '../components/UI/loader/Loader';
import Error from '../components/UI/error/Error';


const ListProjects = ({projects}) => {
    const {store} = useContext(Context);
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
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
            setIsError('Ошибка при получении данных о лайках и избранном');
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
        <div className='projects'>
            {projects.map(project => 
                <ProjectItem key={project.id} project={project} listLikes={likes} listFavorites={favorites} />
            )}

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default ListProjects;
