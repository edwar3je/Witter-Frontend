import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from '../CardComponents/ErrorMessage';
import './styles/LogInForm.css';

/** This component renders a form that allows users to sign into their existing account (if applicable) by sending
 *  their handle and password. The component uses simple frontend error handling to ensure only valid data is sent
 *  to the backend. Upon initial render, the component will generate a 'validateObject' that will determine whether
 *  the data submitted is valid or invalid. Upon form submission, the 'validating' state will be set to true, allowing
 *  the form data to be submitted to the validation route to generate a validation object. A 'valid' valid object
 *  will be generated if the function executed within useEffect does not catch any errors.
 * 
 *  If the value for the 'isValid' key within the validation object is false, an error message will be rendered 
 *  beneath the password input that can be removed. If the value for the 'isValid' key within the validation object 
 *  is true, the data will be sent to backend and a token will be generated that contains the user's profile 
 *  information. Both the token and user information will be stored in the App component's 'user' and 'token' state,
 *  along with being stored locally in localStorage. Afterwards, the user will be redirected back to the home page.
 * 
 *  If the user is already signed in, the user will be redirected to the home page.
 * 
 */

const LogInForm = ({ user, logIn }) => {
    

    const initialState = {
        handle: '',
        password: ''
    };

    /** Any messages inside the messages key will be rendered via the ErrorMessage component. 
    */

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

    /** When the 'validating' state is set to true, a validation sequence will begin. If the form data submitted passes
     *  the validation sequence, the user will be signed in and redirected back to the home page. Otherwise, the
     *  validation object will be replaced with an 'invalid object' resulting in the rendering of an error message via
     *  the ErrorMessage component.
     */

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
    };

    if(user){
        return navigate('/');
    } else {
        return (
            <div className='page-container'>
                <div className='log-in-general-container'>
                    <div className='log-in-title-container'>
                        <h2>Log In</h2>
                    </div>
                    <form className='log-in-input-container' onSubmit={handleSubmit}>
                        <div className='log-in'>
                            <div className='input-left-container'>
                                <label className='log-in-label' htmlFor='handle'>Handle</label>
                                <div class='filler'></div>
                            </div>
                            <div className='input-right-container'>
                                <input type='text' className='log-in' name='handle' value={formData.handle} onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='log-in'>
                            <div className='input-left-container'>
                                <label className='log-in-label' htmlFor='password'>Password</label>
                                <div class='filler'></div>
                            </div>
                            <div className='input-right-container'>
                                <input type='password' className='log-in' name='password' value={formData.password} onChange={handleChange}></input>
                                {loadSignUpError()}
                            </div>
                        </div>
                        <div className='button-container'>
                            <button className='log-in-submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
};

export default LogInForm;