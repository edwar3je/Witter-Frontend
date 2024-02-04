import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './WeetEditForm.css';

const WeetEditForm = ({ user, token }) => {
    
    const initialState = '';

    const { id } = useParams();

    const navigate = useNavigate();

    if(!localStorage.getItem('token')){
        return navigate('/');
    }
    
    return (
        <h1>You have reached the weet edit form for weet {id}</h1>
    )
};

export default WeetEditForm;