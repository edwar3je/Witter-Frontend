import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeetCard from './WeetCard';
import './ProfileReweets.css';

const ProfileReweets = ({ user, token, getReweets }) => {

    const initialState = '';
    const [reweets, setReweets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/')
        }
        const fetchReweets = async (handle, token) => {
            const results = await getReweets(handle, token);
            setReweets(results);
            setIsLoading(false);
        }
        fetchReweets(handle, token).catch(console.error)
    }, [token]);
    
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
                <h1>It appears you don't have any reweeted weets.</h1>
            </div>
        )
    }
};

export default ProfileReweets;