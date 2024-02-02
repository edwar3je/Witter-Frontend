import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = ({ user, signUp }) => {
    
    const initialState = {
        handle: '',
        username: '',
        password: '',
        email: ''
    }

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
        signUp(formData);
        setFormData(initialState);
        navigate('/');
    }

    if(user){
        return navigate('/');
    } else {
        return (
            <div className='sign-up-general-container'>
                <h2 className='sign-up-title'>Sign Up</h2>
                <div>
                    <form className='sign-up-input-container' onSubmit={handleSubmit}>
                        <div className='sign-up-handle'>
                            <label className='sign-up-handle' htmlFor='handle'>Handle</label>
                            <input type='text' className='sign-up' id='handle' name='handle' value={formData.handle} onChange={handleChange}></input>
                        </div>
                        <div className='sign-up-username'>
                            <label className='sign-up-username' htmlFor='username'>Username</label>
                            <input type='text' className='sign-up' id='username' name='username' value={formData.username} onChange={handleChange}></input>
                        </div>
                        <div className='sign-up-password'>
                            <label className='sign-up-password' htmlFor='password'>Password</label>
                            <input type='password' className='sign-up' id='password' name='password' value={formData.password} onChange={handleChange}></input>
                        </div>
                        <div className='sign-up-email'>
                            <label className='sign-up-email' htmlFor='email'>Email</label>
                            <input type='text' className='sign-up' id='email' name='email' value={formData.email} onChange={handleChange}></input>
                        </div>
                        <button className='sign-up-submit'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
};

export default SignUpForm;