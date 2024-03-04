import React, { useState, useEffect } from 'react';
import WeetCard from '../CardComponents/WeetCard';
import Loader from '../CardComponents/Loader';
import WitterApi from '../api';
import './styles/ProfileTabs.css';

/** This component renders a div that contains every weet a given user (by handle) has tabbed. Upon initial render, a function in useEffect will 
 *  fetch every weet the user (handle) has tabbed and save it to the 'tabs' state. Each weet within the 'tabs' state will not only contain the
 *  weet that was tabbed, but also information pertaining to the user making the request (i.e. did the user reweet, favorite or tab the weet). 
 *  If the 'tabs' state contains any weets, each weet will be rendered via the WeetCard component inside a div. If no weets are found within 
 *  'tabs', a special message is generated inside the div informing the user that the account (handle) has not tabbed any weets. This 
 *  component is intended to be used in conjunction with the ProfilePage component.
*/

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
        fetchTabs(handle, token).catch((error) => {
            console.error(error)
        });
    }, [handle]);

    if(isLoading){
        return (
            <div className='load-tabs-container'>
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

    if(user.handle !== handle){
        return (
            <h1>You are not allowed to view this page</h1>
        )
    }

    if(tabs.length >= 1){
        return (
            <div className='tabs-container'>
                {tabs.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                    return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                })}
            </div>
        )
    } else {
        return (
            <div className='tabs-special-notice'>
                <h1>This account does not have any tabbed weets.</h1>
            </div>
        )
    }
};

export default ProfileTabs;