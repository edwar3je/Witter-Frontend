import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Weet.css';

const Weet = ({ user, token }) => {

    const initialState = '';

    const { id } = useParams();

    const navigate = useNavigate();

    if(!localStorage.getItem('token')){
        return navigate('/')
    }

    return (
        <h1>You have reached a weet with id {id}</h1>
    )
};

export default Weet;