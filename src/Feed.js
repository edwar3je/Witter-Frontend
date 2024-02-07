import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeetCard from './WeetCard';
import './Feed.css';

const Feed = ({ user, token, getFeed }) => {
    
    const initialState = '';
    const [weets, setWeets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchWeets = async (token) => {
                const results = await getFeed(token)
                setWeets(results);
                setIsLoading(false)
            }
            fetchWeets(token).catch((error) => {
                console.error(error);
            })
        }
    }, [token]);

    if(!localStorage.getItem('token')){
        navigate('/');
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(weets.length >= 1){
        return (
            <div className='weets-container'>
                    {weets.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                        return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                    })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>Start following accounts or writing weets to fill your feed.</h1>
            </div>
        )
    }
};

export default Feed;