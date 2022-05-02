import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../index";
import '../styles/Favorites.scss';
import ProjectService from '../API/ProjectService';
import Error from '../components/UI/error/Error';
import Loader from '../components/UI/loader/Loader';
import ListProjects from '../components/ListProjects';


const Favorite = () => {
    const {store} = useContext(Context);
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, [])

    async function fetchProjects() {
        try {
            const response = await ProjectService.fetchFavoritesProjects(store.isUserID);

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
        <div className='favorites'>
            {projects.length !== 0
                ? <ListProjects projects={projects} />
                : <p className='empty'>У вас нет избранных проектов</p>
            }

            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Favorite;
