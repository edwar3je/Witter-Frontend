import React, { useState, useEffect } from 'react';
import WeetCard from './WeetCard';
import WitterApi from './api';
import './ProfileFavorites.css';

const ProfileFavorites = ({ user, token, handle }) => {

    const initialState = '';
    const [favorites, setFavorites] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async (handle, token) => {
            const results = await WitterApi.getFavorites(handle, token);
            setFavorites(results);
            setIsLoading(false);
        }
        fetchFavorites(handle, token).catch((error) => {
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

    if(favorites.length >= 1){
        return (
            <div className='favorites-container'>
                {favorites.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                })}
            </div>
        )
    } else {
        return (
            <div className='favorites-special-notice'>
                <h1>This account does not have any favorited weets.</h1>
            </div>
        )
    }
};

export default ProfileFavorites;