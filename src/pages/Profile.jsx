import React from 'react'
import '../styles/Profile.css';
import { FiEdit2 } from "react-icons/fi"
import Button from "../components/UI/button/Button"


const Profile = () => {
    return (
        <div className='profile'>
            <div className="profile__info">
                <div className="information">
                    <div className="information_img">

                    </div>
                    <div className="information__text">
                        <p className="name">Иван Иванов</p>
                        <p className="login">@login</p>
                        <p className="description">Описание</p>
                    </div>
                </div>
                <div className="action">
                    <Button mode='fill'>
                        <FiEdit2 className='icon'/>
                        Редактировать
                    </Button>
                </div>
            </div>

            <div className="profile__content">
                <div className="projects">

                </div>
                <div className="follows">
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;
