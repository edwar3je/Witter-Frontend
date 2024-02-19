import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProfileWeets from './ProfileWeets';
import ProfileReweets from './ProfileReweets';
import ProfileFavorites from './ProfileFavorites';
import ProfileTabs from './ProfileTabs';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowing from './ProfileFollowing';
import WitterApi from './api';
import './ProfilePage.css'

const ProfilePage = ({ user, token, getProfile }) => {
    
    const initialState = '';
    const [profile, setProfile] = useState(initialState);
    const [data, setData] = useState(initialState);
    const [isFollowing, setIsFollowing] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchProfile = async (handle, token) => {
                const fetchedProfile = await getProfile(handle, token);
                setProfile(fetchedProfile);
                setData('weets');
                setIsFollowing(fetchedProfile.followStatus.isFollower)
                setIsLoading(false);
            }
            fetchProfile(handle, token).catch((error) => {
                console.error(error);
                navigate('/NotFound');
            });
        }
    }, [handle]);

    const toWeets = e => {
        e.preventDefault();
        setData('weets');
    }

    const toReweets = e => {
        e.preventDefault();
        setData('reweets');
    }

    const toFavorites = e => {
        e.preventDefault();
        setData('favorites');
    }

    const toTabs = e => {
        e.preventDefault();
        setData('tabs');
    }

    const toFollowers = e => {
        e.preventDefault();
        setData('followers');
    }

    const toFollowing = e => {
        e.preventDefault();
        setData('following');
    }

    const follow = e => {
        e.preventDefault();
        WitterApi.follow(handle, token);
        setIsFollowing(true);
    }

    const unfollow = e => {
        e.preventDefault();
        WitterApi.unfollow(handle, token);
        setIsFollowing(false);
    }

    const followButton = () => {
        if(user.handle !== handle){
            if(isFollowing){
                return (
                    <button className='profile-unfollow-button' onClick={unfollow}>Following</button>
                )
            } else {
                return (
                    <button className='profile-follow-button' onClick={follow}>Follow</button>
                )
            }
        }
    }

    const editButton = () => {
        if(user.handle === handle){
            return (
                <button className='profile-edit-button'>
                    <Link className='profile-edit-link' to={`/profile/${handle}/edit`}>Edit Profile</Link>
                </button>
            )
        }
    }

    const weetsButton = () => {
        if(data === 'weets'){
            return (
                <button className='profile-chosen-button' onClick={toWeets}>Weets</button>
            )
        } else {
            return (
                <button className='profile-change-button' onClick={toWeets}>Weets</button>
            )
        }
    }

    const reweetsButton = () => {
        if(data === 'reweets'){
            return (
                <button className='profile-chosen-button' onClick={toReweets}>Reweets</button>
            ) 
        } else {
            return (
                <button className='profile-change-button' onClick={toReweets}>Reweets</button>
            )
        }
    }

    const favoritesButton = () => {
        if(data === 'favorites'){
            return (
                <button className='profile-chosen-button' onClick={toFavorites}>Favorites</button>
            )
        } else {
            return (
                <button className='profile-change-button' onClick={toFavorites}>Favorites</button>
            )   
        }
    }

    const tabButton = () => {
        if(user.handle === handle){
            if(data === 'tabs'){
                return (
                    <button className='profile-chosen-button' onClick={toTabs}>Tabs</button>
                )  
            } else {
                return (
                    <button className='profile-change-button' onClick={toTabs}>Tabs</button>
                )
            }
        }
    }

    const followersButton = () => {
        if(data === 'followers'){
            return (
                <button className='profile-chosen-button' onClick={toFollowers}>Followers</button>
            )
        } else {
            return (
                <button className='profile-change-button' onClick={toFollowers}>Followers</button>
            )
        }
    }

    const followingButton = () => {
        if(data === 'following'){
            return (
                <button className='profile-chosen-button' onClick={toFollowing}>Following</button>
            )
        } else {
            return (
                <button className='profile-change-button' onClick={toFollowing}>Following</button>
            )
        }
    }

    const loadProfileButtons = () => {
        return (
            <div className='profile-buttons-container'>
                {weetsButton()}
                {reweetsButton()}
                {favoritesButton()}
                {tabButton()}
                {followersButton()}
                {followingButton()}
            </div>
        )
    }

    const loadContent = (data) => {
        if(data === 'weets'){
            return <ProfileWeets user={user} token={token} handle={handle} />
        }
        else if(data === 'reweets'){
            return <ProfileReweets user={user} token={token} handle={handle} />
        }
        else if(data === 'favorites'){
            return <ProfileFavorites user={user} token={token} handle={handle} />
        }
        else if(data === 'tabs'){
            return <ProfileTabs user={user} token={token} handle={handle} />
        }
        else if(data === 'followers'){
            return <ProfileFollowers user={user} token={token} handle={handle} />
        }
        else if(data === 'following'){
            return <ProfileFollowing user={user} token={token} handle={handle} />
        }
    }

    const loadProfile = (profileData) => {
        const { handle, username, user_description, profile_image, banner_image } = profileData;
        return (
            <div className='profile-page-container'>
                <div className='profile-main-container'>
                    <div className='profile-banner-container'>
                        <img src={banner_image}></img>
                    </div>
                    <div className='profile-image-edit-container'>
                        <div className='profile-image-image-container'>
                            <img src={profile_image}></img>
                        </div>
                        <div className='profile-follow-edit-container'>
                            {followButton()}
                            {editButton()}
                        </div>
                    </div>
                    <div className='profile-user-info-container'>
                        <p className='profile-username'>{username}</p>
                        <p className='profile-handle'>{`@${handle}`}</p>
                    </div>
                    <div className='profile-user-description-container'>
                        <p className='profile-user-description'>{user_description}</p>
                    </div>
                    {loadProfileButtons()}
                </div>
                {loadContent(data)}
            </div>
        )
    }

    if(!localStorage.getItem('token')){
        navigate('/');
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return loadProfile(profile);
};

export default ProfilePage;