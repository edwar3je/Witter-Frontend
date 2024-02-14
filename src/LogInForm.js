import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import './LogInForm.css';

const LogInForm = ({ user, logIn }) => {
    

    const initialState = {
        handle: '',
        password: ''
    };

    const initialValidateObject = {
        password: {
            isValid: true,
            messages: []
        }
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [validateObject, setValidateObject] = useState(initialValidateObject);
    const [validating, setValidating] = useState(false);

    useEffect(() => {
        if(validating){
            const handleValidate = async () => {
                await logIn(formData);
                setFormData(initialState);
                navigate('/');
            }
            handleValidate().catch((err) => {
                let currValidObject = validateObject;
                currValidObject.password = {
                    isValid: false,
                    messages: ['Invalid credentials provided.']
                }
                setValidateObject(currValidObject);
                setValidating(false);
            })
        }
    }, [validateObject, validating]);

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

    const loadSignUpError = () => {
        if(!validateObject.password.isValid){
            return (
                <div className='errors-container'>
                   {validateObject.password.messages.map((message) => {
                       return <ErrorMessage message={message} type={'password'} remove={removeMessage} key={uuidv4()} />
                   })}
                </div>
            );
        }
    }

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValidating(true);
        /*logIn(formData);
        setFormData(initialState);
        navigate('/');*/
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
                        {loadSignUpError()}
                        <button className='log-in-submit'>Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};

export default LogInForm;