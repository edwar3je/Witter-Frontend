import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProfilePage.css'

const ProfilePage = ({ user, token, getProfile }) => {
    
    const initialState = '';
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

    return loadProfile(profile);
};

export default ProfilePage;