import React from 'react'
import { useNavigate } from "react-router-dom";


const ListUsers = ({users, action}) => {
    const navigate = useNavigate();

    const clickUser = (userID) => {
        action();
        navigate(`/profile/${userID}`);
    }

    return (
        <div className='list__users'>
            {users.map(user => 
                <div onClick={() => clickUser(user.id)} key={user.id} className='list__users-item'>
                    {user.name}
                </div>
            )}
        </div>
    );
};

export default ListUsers;
