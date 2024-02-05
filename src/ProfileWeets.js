import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeetCard from './WeetCard';
import './ProfileWeets.css';

const ProfileWeets = ({ user, token, getWeets }) => {
    
    const initialState = '';
    const [weets, setWeets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            console.log('failed localStorage check');
            navigate('/');
        }
        const fetchWeets = async (handle, token) => {
            const results = await getWeets(handle, token);
            setWeets(results);
            setIsLoading(false);
        }
        fetchWeets(handle, token).catch(console.error)
    }, [token]);

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
                <h1>It appears you don't have any weets.</h1>
            </div>
        )
    }
};

export default ProfileWeets;