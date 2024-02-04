import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProfileTabs.css';

const ProfileTabs = ({ user, token, getTabs }) => {

    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const { handle } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            const fetchTabs = async (handle, token) => {
                setIsLoading(false);
            }
            fetchTabs(user.handle, token)
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
            <h1>You are not allowed to view this page</h1>
        )
    }

    return (
        <h1>You have reached the profile tabs</h1>
    )
};

export default ProfileTabs;