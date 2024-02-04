import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfileEditForm.css';

const ProfileEditForm = ({ user, token, getProfile, editProfile }) => {

    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchProfile = async (handle, token) => {
                setIsLoading(false);
            }
            fetchProfile(user.handle, token)
        }
    }, [token])

    if(!localStorage.getItem(token)){
        return navigate('/')
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(user && user.handle !== handle){
        return (
            <h1>You are not allowed to access this page</h1>
        )
    }
    
    return (
        <h1>You have reached the profile edit form</h1>
    )
};

export default ProfileEditForm;