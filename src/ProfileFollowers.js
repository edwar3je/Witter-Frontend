import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import WitterApi from './api';
import './ProfileFollowers.css';

const ProfileFollowers = ({ user, token, handle }) => {

    const initialState = '';
    const [followers, setFollowers] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFollowers = async (handle, token) => {
            const results = await WitterApi.getFollowers(handle, token);
            setFollowers(results);
            setIsLoading(false)
        }
        fetchFollowers(handle, token).catch((error) => {
            console.error(error)
        });
    }, [handle]);

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(followers.length >= 1){
        return (
            <div className='profile-followers-container'>
                {followers.map(({handle, username, user_description, profile_image, banner_image, followStatus}) => {
                    return <UserCard handle={handle} username={username} user_description={user_description} profile_image={profile_image} banner_image={banner_image} followStatus={followStatus} user={user} token={token} key={handle}/>
                })}
            </div>
        )
    } else {
        return (
            <div className='profile-followers-notice'>
                <h1>This account does not have any followers.</h1>
            </div>
        )
    }
};

export default ProfileFollowers;