import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeetCard from './WeetCard';
import './ProfileFavorites.css';

const ProfileFavorites = ({ user, token, getFavorites }) => {

    const initialState = '';
    const [favorites, setFavorites] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/')
        }
        const fetchFavorites = async (handle, token) => {
            const results = await getFavorites(handle, token);
            setFavorites(results);
            setIsLoading(false);
        }
        fetchFavorites(handle, token).catch(console.error);
    }, [token]);

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(favorites.length >= 1){
        return (
            <div className='weets-container'>
                {favorites.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>It appears you don't have any favorited weets.</h1>
            </div>
        )
    }
};

export default ProfileFavorites;