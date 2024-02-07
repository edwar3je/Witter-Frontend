import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WitterApi from './api';
import './UserCard.css';

const UserCard = ({ handle, username, user_description, profile_image, banner_image, followStatus, user, token }) => {
    
    const [isFollowed, setIsFollowed] = useState(followStatus.isFollower);

    const follow = async e => {
        e.preventDefault();
        await WitterApi.follow(handle, token);
        setIsFollowed(true);
    }

    const unfollow = async e => {
        e.preventDefault();
        await WitterApi.unfollow(handle, token);
        setIsFollowed(false);
    }

    const loadFollowButton = () => {
        if(handle === user.handle){
            if(isFollowed){
                return (
                    <div className='button-container'>
                        <button onClick={unfollow}>Unfollow</button>
                    </div>
                )
            } else {
                return (
                    <div className='button-container'>
                        <button onClick={follow}>Follow</button>
                    </div>
                )
            }
        }
    }

    return (
        <div className='user-container'>
            <div className='text-container'>
                <h1>{username}</h1>
                <h2>{handle}</h2>
                <p>{user_description}</p>
            </div>
            {loadFollowButton()}
        </div>
    )
}

export default UserCard;