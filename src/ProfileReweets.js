import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileReweets.css';

const ProfileReweets = ({ user, token, getReweets }) => {

    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchReweets = async (handle, token) => {
                setIsLoading(false)
            }
            fetchReweets(user.handle, token)
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
        <h1>You have reached the profile reweets</h1>
    )
};

export default ProfileReweets;