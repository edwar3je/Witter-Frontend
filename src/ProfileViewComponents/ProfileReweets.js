import React, { useState, useEffect } from 'react';
import WeetCard from '../CardComponents/WeetCard';
import Loader from '../CardComponents/Loader';
import WitterApi from '../api';
import './styles/ProfileReweets.css';

/** This component renders a div that contains every weet a given user (by handle) has reweeted. Upon initial render, a function in useEffect will 
 *  fetch every weet the user (handle) has reweeted and save it to the 'reweets' state. Each weet within the 'reweets' state will not only
 *  contain the weet that was reweeted, but also information pertaining to the user making the request that can be separate from the handle
 *  (i.e. did the user reweet, favorite or tab the weet). If the 'reweets' state contains any weets, each weet will be rendered via the WeetCard
 *  component inside a div. If no weets are found within 'reweets', a special message is generated inside the div informing the user that the
 *  account (handle) has not reweeted any weets. This component is intended to be used in conjunction with the ProfilePage component.
*/

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
            <div className='load-reweets-container'>
                <Loader />
            </div>
        )
    }
    
    /*if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }*/

    if(reweets.length >= 1){
        return (
            <div className='reweets-container'>
                {reweets.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                })}
            </div>
        )
    } else {
        return (
            <div className='reweets-special-notice'>
                <h1>This account does not have any reweeted weets.</h1>
            </div>
        )
    }
};

export default ProfileReweets;