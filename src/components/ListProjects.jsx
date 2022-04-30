import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Tape.scss';
import { AiOutlineHeart } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { HiOutlineBookmark } from "react-icons/hi"
import { RiShareForwardLine } from "react-icons/ri"


const ListProjects = ({projects}) => {
    const navigate = useNavigate();

    return (
        <div className='projects'>
            {projects.map((project, index) => 
                <div key={index} className="project">
                    <div className="project__header">
                        <div className="from__data">
                            <div className="person">
                                <div className="photo"></div>
                                <div className="name">Иван Иванов</div>
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
                                <AiOutlineHeart className='project__footer-icon'/>
                                <span>3</span>
                            </div>

                            <div className="comments feedback__item">
                                <FaRegComment className='project__footer-icon'/>
                                <span>0</span>
                            </div>
                            
                            <HiOutlineBookmark className='project__footer-icon'/>
                        </div>

                        <div className="share">
                            <RiShareForwardLine className='project__footer-icon'/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListProjects;
