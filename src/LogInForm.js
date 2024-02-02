import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInForm.css';

const LogInForm = ({ user, logIn }) => {
    

    const initialState = {
        handle: '',
        password: ''
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        logIn(formData);
        setFormData(initialState);
        navigate('/');
    };

    if(user){
        return navigate('/');
    } else {
        return (
            <div className='log-in-general-container'>
                <h2 className='log-in-title'>Log In</h2>
                <div>
                    <form className='log-in-input-container' onSubmit={handleSubmit}>
                        <div className='log-in-handle'>
                            <label className='log-in-label' htmlFor='handle'>Handle</label>
                            <input type='text' className='log-in' name='handle' value={formData.handle} onChange={handleChange}></input>
                        </div>
                        <div className='log-in-password'>
                            <label className='log-in-label' htmlFor='password'>Password</label>
                            <input type='password' className='log-in' name='password' value={formData.password} onChange={handleChange}></input>
                        </div>
                        <button className='log-in-submit'>Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};

export default LogInForm;