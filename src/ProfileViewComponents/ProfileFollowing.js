import React, { useState, useEffect } from 'react';
import UserCard from '../CardComponents/UserCard';
import Loader from '../CardComponents/Loader';
import WitterApi from '../api';
import './styles/ProfileFollowing.css';

/** This component renders a div that contains every account a given user (by handle) is currently following. Upon initial render, a function in 
 *  useEffect will fetch every account the user (handle) is currently following and save it to the 'following' state. Each account within the 
 *  'following' state will not only contain information on the account, but also information pertaining to the user making the request that can 
 *  be seperate from the handle (i.e. does the account follow or is followed by the user making the request). If 'following' contains any accounts, 
 *  each account will be rendered via the UserCard component inside a div. If no accounts are found within 'following', a special message is 
 *  generated inside the div informing the user that the account (handle) is not currently following any accounts. This component is intended to be 
 *  used in conjunction with the ProfilePage component.
 */

const ProfileFollowing = ({ user, token, handle }) => {
    
    const initialState = '';
    const [following, setFollowing] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFollowing = async (handle, token) => {
            const results = await WitterApi.getFollowing(handle, token);
            setFollowing(results);
            setIsLoading(false);
        }
        fetchFollowing(handle, token).catch((error) => {
            console.error(error);
        })
    }, [handle]);

    if(isLoading){
        return (
            <div className='load-following-container'>
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
    
    if(following.length >= 1){
        return (
            <div className='profile-following-container'>
                {following.map(({handle, username, user_description, profile_image, banner_image, followStatus}) => {
                    return <UserCard handle={handle} username={username} user_description={user_description} profile_image={profile_image} banner_image={banner_image} followStatus={followStatus} user={user} token={token} key={handle}/>
                })}
            </div>
        )
    } else {
        return (
            <div className='profile-following-notice'>
                <h1>This account is not following any accounts.</h1>
            </div>
        )
    }
};

export default ProfileFollowing;