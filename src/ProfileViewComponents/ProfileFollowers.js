import React, { useState, useEffect } from 'react';

import UserCard from '../CardComponents/UserCard';
import Loader from '../CardComponents/Loader';
import WitterApi from '../api';
import './styles/ProfileFollowers.css';

/** This component renders a div that contains every account that follows a given user (by handle). Upon initial render, a function in useEffect
 *  will fetch every account that is currently following the user (handle) and save it to the 'followers' state. Each account within the 'followers'
 *  state will not only contain information on the account, but also information pertaining to the user making the request that can be seperate from
 *  the handle (i.e. does the account follow or is followed by the user making the request). If 'followers' contains any accounts, each account will 
 *  be rendered via the UserCard component inside a div. If no accounts are found within 'followers', a special message is generated inside the div 
 *  informing the user that the account (handle) does not have any followers. This component is intended to be used in conjunction with the ProfilePage 
 *  component.
 */

const ProfileFollowers = ({ user, token, handle }) => {

    const initialState = '';
    const [followers, setFollowers] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFollowers = async (handle, token) => {
            const results = await WitterApi.getFollowers(handle, token);
            setFollowers(results);
            setIsLoading(false)
        }
        fetchFollowers(handle, token).catch((error) => {
            console.error(error)
        });
    }, [handle]);

    if(isLoading){
        return (
            <div className='load-followers-container'>
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

    if(followers.length >= 1){
        return (
            <div className='profile-followers-container'>
                {followers.map(({handle, username, user_description, profile_image, banner_image, followStatus}) => {
                    return <UserCard handle={handle} username={username} user_description={user_description} profile_image={profile_image} banner_image={banner_image} followStatus={followStatus} user={user} token={token} key={handle}/>
                })}
            </div>
        )
    } else {
        return (
            <div className='profile-followers-notice'>
                <h1>This account does not have any followers.</h1>
            </div>
        )
    }
};

export default ProfileFollowers;