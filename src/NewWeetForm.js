import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import './NewWeetForm.css';

const NewWeetForm = ({ user, token, createWeet }) => {
    
    const initialState = '';

    const initialValidObject = {
        weet: {
            isValid: true,
            messages: []
        }
    }

    const [weet, setWeet] = useState(initialState);
    const [validateObject, setValidateObject] = useState(initialValidObject);
    const [validating, setValidating] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(validating){
            const handleValidate = async () => {
                let workingValidObject = initialValidObject;
                if(weet === initialState || weet.length > 250){
                    workingValidObject.weet.messages.push('A weet must be between 1 to 250 characters in length.')
                }
                const weetRegex1 = new RegExp(/^(?=.*\S).+$/);
                const weetRegex2 = new RegExp(/^[^\s]/);
                if(!weetRegex1.test(weet) || !weetRegex2.test(weet)){
                    workingValidObject.weet.messages.push('A weet cannot consist of just blank spaces, nor start with a blank space.')
                }
                if(workingValidObject.weet.messages.length >= 1){
                    workingValidObject.weet.isValid = false;
                }
                if(!workingValidObject.weet.isValid){
                    setValidateObject(workingValidObject);
                    setValidating(false);
                } else {
                    await createWeet(weet, token);
                    setWeet(initialState);
                    setValidateObject(workingValidObject);
                    setValidating(false);
                    navigate(`/profile/${user.handle}`)
                }
            }
            handleValidate().catch((err) => {
                console.error(err)
            })
        }
    }, [validating, validateObject])

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

    const loadWeetErrors = () => {
        if(!validateObject.weet.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.weet.messages.map((message) => {
                        return <ErrorMessage message={message} type={'weet'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            )
        }
    }

    const handleChange = e => {
        setWeet(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValidating(true);
    }

    if(!localStorage.getItem('token')){
        navigate('/')
    }
    
    return (
        <div className='page-container'>
            <div className='create-weet-general-container'>
                <div className='create-weet-title-container'>
                    <h2 className='create-weet-title'>Create Weet</h2>
                </div>
                <form className='create-weet-input-container' onSubmit={handleSubmit}>
                    <div className='create-weet-weet'>
                        <textarea className='weet' name='weet' value={weet} onChange={handleChange}></textarea>
                        {loadWeetErrors()}
                    </div>
                    <div className='button-container'>
                        <button className='create-weet-submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewWeetForm;