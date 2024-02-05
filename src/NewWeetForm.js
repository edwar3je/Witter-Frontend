import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewWeetForm.css';

const NewWeetForm = ({ user, token, createWeet }) => {
    
    const initialState = '';

    const navigate = useNavigate();

    const [weet, setWeet] = useState(initialState);

    const handleChange = e => {
        setWeet(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(weet === initialState || weet.length > 250){
            setWeet(initialState)
        } else {
            createWeet(weet, token);
            setWeet(initialState);
            navigate(`/profile/${user.handle}`);
        }
    }

    if(!localStorage.getItem('token')){
        navigate('/')
    }
    
    return (
        <div className='create-weet-general-container'>
            <h2 className='create-weet-title'>Create Weet</h2>
            <div>
                <form className='create-weet-input-container' onSubmit={handleSubmit}>
                    <div className='create-weet-weet'>
                        <input type='text' className='weet' name='weet' value={weet} onChange={handleChange}></input>
                    </div>
                    <button className='create-weet-submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewWeetForm;