import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import WitterApi from './api';
import './ProfileFollowing.css';

const ProfileFollowing = ({ user, token, handle }) => {
    
    const initialState = '';
    const [following, setFollowing] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFollowing = async (handle, token) => {
            const results = await WitterApi.getFollowing(handle, token);
            setFollowing(results);
            setIsLoading(false);
        }
        fetchFollowing(handle, token).catch((error) => {
            console.error(error);
        })
    }, [handle]);

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    if(following.length >= 1){
        return (
            <div>
                {following.map(({handle, username, user_description, profile_image, banner_image, followStatus}) => {
                    return <UserCard handle={handle} username={username} user_description={user_description} profile_image={profile_image} banner_image={banner_image} followStatus={followStatus} user={user} token={token} key={handle}/>
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>This account is not following any accounts.</h1>
            </div>
        )
    }
};

export default ProfileFollowing;