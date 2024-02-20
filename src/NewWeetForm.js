import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import './NewWeetForm.css';

/** This component renders a form that allows users to post new weets. This component uses simple frontend error validation
 *  to ensure only valid data is sent to the backend. Upon initial render, the component will generate a 'validateObject'
 *  that will determine whether the data submitted is valid or not. Upon form submission, the 'validating' state will be
 *  set to true to allow the form data to pass through a set of checks that generates a validation object. For a 'valid'
 *  valid object to be returned, the weet must pass two checks:
 *     1.) The weet is less than or equal to 250 characters in length.
 *     2.) The weet meets the regular expression (cannot consist of just empty spaces nor begin with an empty space).
 * 
 *  If any of the checks fail, the 'isValid' for the validation object will be set to false, and each message within the
 *  validation object will be rendered via the ErrorMessage component. If none of the checks fail, the form data will be
 *  submitted to the backend via an API call (resulting in a new weet) and the user will be redirected to their profile page.
 * 
 *  If the user is not signed in (token not found in localStorage), the user will be redirected to the home page.
 */

const NewWeetForm = ({ user, token, createWeet }) => {
    
    const initialState = '';

    /** Any messages inside the messages key will be rendered via the ErrorMessage component.
     */

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

    /** When the 'validating' state is set to true, a validation sequence will begin. If the form data submitted passes
     *  the validation sequence, a new weet will be created and the user will be redirected to their profile page. 
     *  Otherwise, the validation object will be replaced with an 'invalid object' resulting in the rendering of an error 
     *  message via the ErrorMessage component.
     */

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
    }, [validating, validateObject]);

    /** This function will allow the user to remove the specific message from the 'LogInForm' component's 'validateObject' state,
     *  causing the associated ErrorMessage component to unrender.
     */

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

    /** This function renders an ErrorMessage component if the existing 'validateObject' state's isValid key has false as a value. */

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