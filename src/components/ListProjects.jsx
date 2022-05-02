import React from 'react'
import Project from './Project';


const ListProjects = ({projects, likes, favorites}) => {
    return (
        <div className='projects'>
            {projects.map(project => 
                <Project key={project.id} project={project} listLikes={likes} listFavorites={favorites} />
            )}
        </div>
    );
};

export default ListProjects;
