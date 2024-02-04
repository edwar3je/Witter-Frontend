import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feed.css';

const Feed = ({ user, token, getFeed }) => {
    
    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchFeed = async (handle, token) => {
                setIsLoading(false)
            }
            fetchFeed(user.handle, token)
        }
    }, [token]);

    if(!localStorage.getItem('token')){
        return navigate('/');
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <h1>You have reached the feed</h1>
    )
};

export default Feed;