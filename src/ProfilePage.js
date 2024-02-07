import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProfileWeets from './ProfileWeets';
import ProfileReweets from './ProfileReweets';
import ProfileFavorites from './ProfileFavorites';
import ProfileTabs from './ProfileTabs';
import './ProfilePage.css'

const ProfilePage = ({ user, token, getProfile }) => {
    
    const initialState = '';
    const [profile, setProfile] = useState(initialState);
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchProfile = async (handle, token) => {
                const fetchedProfile = await getProfile(handle, token);
                setProfile(fetchedProfile);
                setData('weets');
                setIsLoading(false);
            }
            fetchProfile(handle, token).catch((error) => {
                console.error(error);
                navigate('/NotFound');
            });
        }
    }, [token]);

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

    const editButton = (user, handle) => {
        if(user.handle === handle){
            return (
                <button>
                    <Link to={`/profile/${handle}/edit`}>Edit Profile</Link>
                </button>
            )
        }
    }

    const tabButton = (user, handle) => {
        if(user.handle === handle){
            return (
                <button onClick={toTabs}>Tabs</button>
            )
        }
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
            return (
                <h1>You have reached the followers page</h1>
            )
        }
        else if(data === 'following'){
            return (
                <h1>You have reached the following page</h1>
            )
        }
    }

    const loadProfile = (profileData) => {
        const { handle, username, user_description, profile_image, banner_image } = profileData;
        return (
            <div className='profile-container'>
                <h1>{username}</h1>
                <h2>{handle}</h2>
                <p>{user_description}</p>
                {editButton(user, handle)}
                <div className='link-container'>
                    <button onClick={toWeets}>Weets</button>
                    <button onClick={toReweets}>Reweets</button>
                    <button onClick={toFavorites}>Favorites</button>
                    {tabButton(user, handle)}
                    <button onClick={toFollowers}>Followers</button>
                    <button onClick={toFollowing}>Following</button>
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
    
    /*const initialState = '';
    const [profile, setProfile] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchProfile = async (handle, token) => {
                const fetchedProfile = await getProfile(handle, token);
                if(!fetchedProfile){
                    navigate('/NotFound');
                }
                setProfile(fetchedProfile);
                setIsLoading(false);
            }
            fetchProfile(handle, token).catch(console.error)
        }
    }, [token]);
    
    const editButton = (user, handle) => {
        if(user.handle === handle){
            return (
                <button>
                    <Link to={`/profile/${handle}/edit`}>Edit Profile</Link>
                </button>
            )
        }
    }

    const tabButton = (user, handle) => {
        if(user.handle === handle){
            return (
                <button>
                    <Link to={`/profile/${handle}/tabs`}>Tabs</Link>
                </button>
            )
        }
    }

    const loadProfile = (profileData) => {
        const { handle, username, user_description, profile_image, banner_image } = profileData;
        return (
            <div className='profile-container'>
                <h1>{username}</h1>
                <h2>{handle}</h2>
                <p>{user_description}</p>
                {editButton(user, handle)}
                <div className='link-container'>
                    <button>
                        <Link to={`/profile/${handle}/weets`}>Weets</Link>
                    </button>
                    <button>
                        <Link to={`/profile/${handle}/reweets`}>Reweets</Link>
                    </button>
                    <button>
                        <Link to={`/profile/${handle}/favorites`}>Favorites</Link>
                    </button>
                    {tabButton(user, handle)}
                    <button>
                        <Link to={`/profile/${handle}/followers`}>Followers</Link>
                    </button>
                    <button>
                        <Link to={`/profile/${handle}/following`}>Following</Link>
                    </button>
                </div>
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

    return loadProfile(profile);*/
};

export default ProfilePage;