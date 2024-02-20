import React, { useState, useEffect } from 'react';
import WeetCard from './WeetCard';
import WitterApi from './api';
import './ProfileWeets.css';

/** This component renders a div that contains every weet a given user (by handle) has written. Upon initial render, a function in useEffect will 
 *  fetch every weet the user (handle) has written and save it to the 'weets' state. Each weet within the 'weets' state will not only contain the
 *  weet that was written, but also information pertaining to the user making the request that can be separate from the handle (i.e. did the user 
 *  reweet, favorite or tab the weet). If the 'weets' state contains any weets, each weet will be rendered via the WeetCard component inside a div. 
 *  If no weets are found within 'weets', a special message is generated inside the div informing the user that the account (handle) has not written
 *  any weets. This component is intended to be used in conjunction with the ProfilePage component.
*/

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
            <div className='weets-special-notice'>
                <h1>This account does not have any published weets.</h1>
            </div>
        )
    }
};

export default ProfileWeets;