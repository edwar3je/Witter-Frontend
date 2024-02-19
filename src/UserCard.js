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
        if(handle !== user.handle){
            if(isFollowed){
                return (
                    <button className='user-card-unfollow-button' onClick={unfollow}>Following</button>
                )
            } else {
                return (
                    <button className='user-card-follow-button' onClick={follow}>Follow</button>
                )
            }
        }
    }

    return (
        <Link className='user-card-link' to={`/profile/${handle}`}>
            <div className='main-user-card-container'>
                <div className='left-user-card-container'>
                    <div className='profile-image-container'>
                        <img src={profile_image}></img>
                    </div>
                </div>
                <div className='center-user-card-container'>
                    <p>{username}</p>
                    <small>{`@${handle}`}</small>
                </div>
                <div className='right-user-card-container'>
                    {loadFollowButton()}
                </div>
            </div>
        </Link>
    )
}

export default UserCard;