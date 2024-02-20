import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WitterApi from './api';
import './UserCard.css';

/** This component renders a div that contains information on a specific account, based on the information provided in the props.
 *  Generally, the information required to generate a user card is fetched via a parent component. Said information not only includes
 *  information on the account, but also information pertaining to the user requesting the account (e.g. is the user currently following
 *  the account). If the handle on the user card does not match the current user's account, the user card will render either a follow or
 *  unfollow button that will allow the user to either follow or unfollow the account. This component is primarily used with other parent
 *  components such as SearchPage, ProfileFollowers and ProfileFollowing.
 */

const UserCard = ({ handle, username, user_description, profile_image, banner_image, followStatus, user, token }) => {

    /** The initial state of isFollowed depends on the followStatus prop. This state is used to determine whether the user is currently
     *  following the account. The state can be changed if the user clicks the follow button (isFollowed is currently false) or clicks
     *  the unfollow button (isFollowed is currently true).
     */
    
    const [isFollowed, setIsFollowed] = useState(followStatus.isFollower);

    /** These two functions set the follow status between the user and the account on the backend and change the isFollowed state appropriately.
     */

    const follow = async e => {
        e.preventDefault();
        await WitterApi.follow(handle, token);
        setIsFollowed(true);
    }

    const unfollow = async e => {
        e.preventDefault();
        await WitterApi.unfollow(handle, token);
        setIsFollowed(false);
    }

    /** This function renders either the follow button or the unfollow button if the handle of the account does not belong to the user.
     */

    const loadFollowButton = () => {
        if(handle !== user.handle){
            if(isFollowed){
                return (
                    <button className='user-card-unfollow-button' onClick={unfollow}>Following</button>
                )
            } else {
                return (
                    <button className='user-card-follow-button' onClick={follow}>Follow</button>
                )
            }
        }
    }

    return (
        <Link className='user-card-link' to={`/profile/${handle}`}>
            <div className='main-user-card-container'>
                <div className='left-user-card-container'>
                    <div className='profile-image-container'>
                        <img src={profile_image}></img>
                    </div>
                </div>
                <div className='center-user-card-container'>
                    <p>{username}</p>
                    <small>{`@${handle}`}</small>
                </div>
                <div className='right-user-card-container'>
                    {loadFollowButton()}
                </div>
            </div>
        </Link>
    )
}

export default UserCard;