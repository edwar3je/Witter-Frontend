import React, { useState, useEffect } from 'react';
import WeetCard from './WeetCard';
import WitterApi from './api';
import './ProfileFavorites.css';

/** This component renders a div that contains every weet a given user (by handle) has favorited. Upon initial render, a function in useEffect will
 *  fetch every weet the user (handle) has favorited and save it to the 'favorites' state. Each weet within the 'favorites' state will not only
 *  contain the weet favorited, but also information pertaining to the user making the request that can be seperate from the handle (i.e. did the user
 *  reweet, favorite or tab the weet). If the 'favorites' state contains any weets, each weet will be rendered via the WeetCard component inside a div.
 *  If no weets are found within 'favorites', a special message is generated inside the div informing the user that the account (handle) has not favorited
 *  any weets. This component is intended to be used in conjunction with the ProfilePage component.
 */

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