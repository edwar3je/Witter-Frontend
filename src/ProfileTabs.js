import React, { useState, useEffect } from 'react';
import WeetCard from './WeetCard';
import WitterApi from './api';
import './ProfileTabs.css';

const ProfileTabs = ({ user, token, handle }) => {

    const initialState = '';
    const [tabs, setTabs] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTabs = async (handle, token) => {
            const results = await WitterApi.getTabs(handle, token);
            setTabs(results);
            setIsLoading(false);
        }
        fetchWeets(handle, token).catch((error) => {
            console.error(error)
        });
    }, [token]);

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(user.handle !== handle){
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
                <h1>This account does not have any tabbed weets.</h1>
            </div>
        )
    }
};

export default ProfileTabs;