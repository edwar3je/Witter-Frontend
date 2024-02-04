import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileFavorites.css';

const ProfileFavorites = ({ user, token, getFavorites }) => {

    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchFavorites = async (handle, token) => {
                setIsLoading(false);
            }
            fetchFavorites(user.handle, token)
        }
    }, [token]);

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
        <h1>You have reached the profile favorites</h1>
    )
};

export default ProfileFavorites;