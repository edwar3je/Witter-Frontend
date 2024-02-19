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
                    await signUp(formData);
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
        if(!validateObject.handle.isValid && validateObject.handle.messages.length >= 1){
            return (
                <div className='errors-container'>
                    {validateObject.handle.messages.map((message) => {
                        return <ErrorMessage message={message} type={'handle'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    };

    const loadUsernameErrors = () => {
        if(!validateObject.username.isValid && validateObject.username.messages.length >= 1){
            return (
                <div className='errors-container'>
                    {validateObject.username.messages.map((message) => {
                        return <ErrorMessage message={message} type={'username'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    };

    const loadPasswordErrors = () => {
        if(!validateObject.password.isValid && validateObject.password.messages.length >= 1){
            return (
                <div className='errors-container'>
                    {validateObject.password.messages.map((message) => {
                        return <ErrorMessage message={message} type={'password'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    };

    const loadEmailErrors = () => {
        if(!validateObject.email.isValid && validateObject.password.messages.length >= 1){
            return (
                <div className='errors-container'>
                    {validateObject.email.messages.map((message) => {
                        return <ErrorMessage message={message} type={'email'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
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
            <div className='page-container'>
                <div className='sign-up-general-container'>
                    <div className='sign-up-title-container'>
                        <h2 className='sign-up-title'>Sign Up</h2>
                    </div>
                    <form className='sign-up-input-container' onSubmit={handleSubmit}>

                        <div className='sign-up'>
                            <div className='input-left-container'>
                                <label className='sign-up-label' htmlFor='handle'>Handle</label>
                                <div className='filler'></div>
                            </div>
                            <div className='input-right-container'>
                                <input type='text' className='sign-up' id='handle' name='handle' value={formData.handle} onChange={handleChange}></input>
                                {loadHandleErrors()}
                            </div>
                        </div>

                        <div className='sign-up'>
                            <div className='input-left-container'>
                                <label className='sign-up-label' htmlFor='username'>Username</label>
                                <div className='filler'></div>
                            </div>
                            <div className='input-right-container'>
                                <input type='text' className='sign-up' id='username' name='username' value={formData.username} onChange={handleChange}></input>
                                {loadUsernameErrors()}
                            </div>
                        </div>

                        <div className='sign-up'>
                            <div className='input-left-container'>
                                <label className='sign-up-label' htmlFor='password'>Password</label>
                                <div className='filler'></div>
                            </div>
                            <div className='input-right-container'>
                                <input type='password' className='sign-up' id='password' name='password' value={formData.password} onChange={handleChange}></input>
                                {loadPasswordErrors()}
                            </div>
                        </div>

                        <div className='sign-up'>
                            <div className='input-left-container'>
                                <label className='sign-up-label' htmlFor='email'>Email</label>
                                <div className='filler'></div>
                            </div>
                            <div className='input-right-container'>
                                <input type='text' className='sign-up' id='email' name='email' value={formData.email} onChange={handleChange}></input>
                                {loadEmailErrors()}
                            </div>
                        </div>

                        <div className='button-container'>
                            <button className='sign-up-submit'>Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
};

export default SignUpForm;