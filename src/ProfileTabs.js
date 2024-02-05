import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeetCard from './WeetCard';
import './ProfileTabs.css';

const ProfileTabs = ({ user, token, getTabs }) => {

    const initialState = '';
    const [tabs, setTabs] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/')
        }
        const fetchTabs = async (handle, token) => {
            const results = await getTabs(handle, token);
            setTabs(results);
            setIsLoading(false);
        }
        fetchTabs(handle, token).catch(console.error)
    }, [token]);

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(user && user.handle !== handle){
        return (
            <h1>You are not allowed to view this page</h1>
        )
    }

    if(tabs.length >= 1){
        return (
            <div className='weets-container'>
                {tabs.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>It appears you don't have any tabbed weets.</h1>
            </div>
        )
    }
};

export default ProfileTabs;