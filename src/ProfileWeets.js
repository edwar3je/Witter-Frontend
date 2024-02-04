import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileWeets.css';

const ProfileWeets = ({ user, token, getWeets }) => {
    
    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchWeets = async (handle, token) => {
                setIsLoading(false);
            }
            fetchWeets(user.handle, token)
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
        <h1>You have reached the profile weets</h1>
    )
};

export default ProfileWeets;