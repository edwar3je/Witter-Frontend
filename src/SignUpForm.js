import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import './SignUpForm.css';

const SignUpForm = ({ user, signUp, validateSignUp }) => {
    
    const initialState = {
        handle: '',
        username: '',
        password: '',
        email: ''
    }

    const initialValidObject = {
        handle: {
            isValid: true,
            messages: []
        },
        username: {
            isValid: true,
            messages: []
        },
        password: {
            isValid: true,
            messages: []
        },
        email: {
            isValid: true,
            messages: []
        }
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [validateObject, setValidateObject] = useState(initialValidObject);
    const [validating, setValidating] = useState(false);

    useEffect(() => {
        if(validating){
            const handleValidate = async () => {
                let pass = true;
                const { handle, username, password, email } = formData;
                const result = await validateSignUp(handle, username, password, email);
                for(let key in result){
                    if(!result[key].isValid){
                        pass = false;
                    }
                }
                if(!pass){
                    setValidateObject(result);
                    setValidating(false);
                } else {
                    signUp(formData);
                    setFormData(initialState);
                    setValidateObject(initialValidObject);
                    setValidating(false);
                    navigate('/');
                }
            }
            handleValidate();
        }
    }, [validateObject, validating]);

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

    const loadHandleErrors = () => {
        if(!validateObject.handle.isValid){
            return (
                <>
                    {validateObject.handle.messages.map((message) => {
                        return <ErrorMessage message={message} type={'handle'} remove={removeMessage} key={uuidv4()} />
                    })}
                </>
            );
        }
    };

    const loadUsernameErrors = () => {
        if(!validateObject.username.isValid){
            return (
                <>
                    {validateObject.username.messages.map((message) => {
                        return <ErrorMessage message={message} type={'username'} remove={removeMessage} key={uuidv4()} />
                    })}
                </>
            );
        }
    };

    const loadPasswordErrors = () => {
        if(!validateObject.password.isValid){
            return (
                <>
                    {validateObject.password.messages.map((message) => {
                        return <ErrorMessage message={message} type={'password'} remove={removeMessage} key={uuidv4()} />
                    })}
                </>
            );
        }
    };

    const loadEmailErrors = () => {
        if(!validateObject.email.isValid){
            return (
                <>
                    {validateObject.email.messages.map((message) => {
                        return <ErrorMessage message={message} type={'email'} remove={removeMessage} key={uuidv4()} />
                    })}
                </>
            );
        }
    };

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValidating(true);
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
                            {loadHandleErrors()}
                        </div>
                        <div className='sign-up-username'>
                            <label className='sign-up-username' htmlFor='username'>Username</label>
                            <input type='text' className='sign-up' id='username' name='username' value={formData.username} onChange={handleChange}></input>
                            {loadUsernameErrors()}
                        </div>
                        <div className='sign-up-password'>
                            <label className='sign-up-password' htmlFor='password'>Password</label>
                            <input type='password' className='sign-up' id='password' name='password' value={formData.password} onChange={handleChange}></input>
                            {loadPasswordErrors()}
                        </div>
                        <div className='sign-up-email'>
                            <label className='sign-up-email' htmlFor='email'>Email</label>
                            <input type='text' className='sign-up' id='email' name='email' value={formData.email} onChange={handleChange}></input>
                            {loadEmailErrors()}
                        </div>
                        <button className='sign-up-submit'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
};

export default SignUpForm;