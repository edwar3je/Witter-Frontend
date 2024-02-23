import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProfileWeets from '../ProfileViewComponents/ProfileWeets';
import ProfileReweets from '../ProfileViewComponents/ProfileReweets';
import ProfileFavorites from '../ProfileViewComponents/ProfileFavorites';
import ProfileTabs from '../ProfileViewComponents/ProfileTabs';
import ProfileFollowers from '../ProfileViewComponents/ProfileFollowers';
import ProfileFollowing from '../ProfileViewComponents/ProfileFollowing';
import WitterApi from '../api';
import './styles/ProfilePage.css';

/** This component serves as an account's profile page. Users are allowed to perform the following actions while on a profile page: view every weet
 *  the account has posted, reweeted, favorited or tabbed (only available if it is the current user's profile page), view every account that follows
 *  or is followed by the account, follow/unfollow the account (assuming it is not the current user's profile page) and/or edit the profile (only
 *  available if it is the current user's profile page).
 * 
 *  Upon initial render, the function within useEffect will fetch the account's profile information based on the handle provided in the url (and the token
 *  contained within props). If the account does not exist (error returned from function call), the user will be redirected to the 'Not Found' page.
 *  Otherwise, the profile information will be placed inside the 'profile' state, which will be used to render the account's profile page. Additionally,
 *  the 'date' state is initially set to 'weets' to ensure that the first set of data below the main profile container renders the ProfileWeets component.
 *  The component rendered below can be changed via pressing one of the corresponding 'change profile' buttons.
 * 
 *  If the user is not currently signed in (token not found in localStorage), the user will be redirected to the home page.
 */

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

    /** These functions are used by the 'change-profile' buttons to change the component that is rendered below the main profile container.
     */

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

    /** These two functions allow the user to either follow or unfollow the account corresponding to the profile. Upon clicking the appropriate button,
     *  the 'isFollowing' state will be set to the inverse, causing the current button rendered to change. An API call is also made to ensure the user
     *  is listed as following or not following the account.
    */

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

    /** This function renders a button that allows users to either follow or unfollow the account corresponding to the profile. If the profile page belongs
     *  to the current user, the function will not return any jsx element. Otherwise, the appropriate element will be rendered based on the current 
     *  'isFollowing' state.
     */

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

    /** This function renders a button that will redirect the current user to a form that will allow them to edit their profile. This button will only render
     *  if the profile page belongs to the current user.
     */

    const editButton = () => {
        if(user.handle === handle){
            return (
                <button className='profile-edit-button'>
                    <Link className='profile-edit-link' to={`/profile/${handle}/edit`}>Edit Profile</Link>
                </button>
            )
        }
    }

    /** These functions render the appropriate 'change-profile' buttons that change which component is rendered beneath the main profile container. If the value of 'data'
     *  matches the corresponding button (e.g. 'weets' for weetsButton), a special version of the button will be rendered that signifies which data type is being displayed.
     */

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

    // This function is different from the other 'change-profile' buttons because it is only rendered if the profile page belongs to the current user.

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

    // This function renders a div that contains each function that renders a corresponding 'change-profile' button.

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

    // This function renders the appropriate component beneath the main profile container depending on the current state of 'data'

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

    // This function renders the entire profile page based on the current state of 'profileData'

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