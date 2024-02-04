import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfileFollowers.css';

const ProfileFollowers = ({ user, token, getFollowers }) => {

    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);
    
    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchFollowers = async (handle, token) => {
                setIsLoading(false)
            }
            fetchFollowers(user.handle, token)
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
        <h1>You have reached the followers of {handle}</h1>
    )
};

export default ProfileFollowers;