import React from 'react'
import '../styles/Project.css';
import { AiOutlineHeart } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { HiOutlineBookmark } from "react-icons/hi"
import { RiShareForwardLine } from "react-icons/ri"


const Popular = () => {
    return (
        <div className='projects'>
            <div className="project">
                <div className="project__header">
                    <div className="from__data">
                        <div className="from">
                            <div className="photo"></div>
                            <div className="person">Иван Иванов</div>
                        </div>
                        <div className="time">6 часов</div>
                    </div>

                    <div className="heading">
                        <p className="title">Название проекта</p>
                        <p className="price">15000₽</p>
                    </div>
                </div>

                <div className="project__body">
                    <p className="description">Описание проекта. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quidem laudantium dolorum ducimus fugiat, nihil cumque minus numquam dolor ea corporis consectetur ipsam omnis nulla. Eligendi atque incidunt deleniti cum.</p>
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
        </div>
    );
};

export default Popular;
