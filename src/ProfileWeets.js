import React, { useState, useEffect } from 'react';
import WeetCard from './WeetCard';
import WitterApi from './api';
import './ProfileWeets.css';

const ProfileWeets = ({ user, token, handle }) => {
    
    const initialState = '';
    const [weets, setWeets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeets = async (handle, token) => {
            const results = await WitterApi.getWeets(handle, token);
            setWeets(results);
            setIsLoading(false);
        }
        fetchWeets(handle, token).catch((error) => {
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
                <h1>This account does not have any published weets.</h1>
            </div>
        )
    }
};

export default ProfileWeets;