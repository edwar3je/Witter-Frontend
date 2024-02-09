import React, { useState, useEffect } from 'react';
import WeetCard from './WeetCard';
import WitterApi from './api';
import './ProfileReweets.css';

const ProfileReweets = ({ user, token, handle }) => {

    const initialState = '';
    const [reweets, setReweets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReweets = async (handle, token) => {
            const results = await WitterApi.getReweets(handle, token);
            setReweets(results);
            setIsLoading(false);
        }
        fetchReweets(handle, token).catch((error) => {
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

    if(reweets.length >= 1){
        return (
            <div>
                {reweets.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>This account does not have any reweeted weets.</h1>
            </div>
        )
    }
};

export default ProfileReweets;