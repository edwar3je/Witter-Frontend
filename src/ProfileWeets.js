import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeetCard from './WeetCard';
import './ProfileWeets.css';

const ProfileWeets = ({ user, token, getWeets }) => {
    
    const initialState = '';
    const [weets, setWeets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchWeets = async (handle, token) => {
                const results = await getWeets(handle, token);
                setWeets(results);
                setIsLoading(false);
            }
            fetchWeets(user.handle, token)
        }
    }, [token])

    if(!localStorage.getItem(token)){
        navigate('/')
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
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} />
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>It appears you don't have any weets. Start writing today!</h1>
            </div>
        )
    }
};

export default ProfileWeets;