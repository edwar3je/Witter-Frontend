import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfileFollowing.css';

const ProfileFollowing = ({ user, token, getFollowing }) => {
    
    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);
    
    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchFollowing = async (handle, token) => {
                setIsLoading(false);
            }
            fetchFollowing(user.handle, token)
        }
    }, [token])

    if(!localStorage.getItem(token)){
        return navigate('/')
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <h1>You have reached the following page for {handle}</h1>
    )
};

export default ProfileFollowing;