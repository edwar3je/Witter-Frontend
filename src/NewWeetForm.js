import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewWeetForm.css';

const NewWeetForm = ({ user, token }) => {
    
    const initialState = '';

    const navigate = useNavigate();
    
    if(!localStorage.getItem('token')){
        return navigate('/')
    }
    
    return (
        <h1>You have reached the create weet form</h1>
    )
};

export default NewWeetForm;