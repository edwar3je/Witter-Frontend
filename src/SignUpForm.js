import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import './SignUpForm.css';

/** This component renders a form that allows users to create a new account. The component uses simple frontend error handling to ensure only valid
 *  data is submitted to the backend. Upon initial render, the component will generate a 'validateObject' that contains multiple keys each
 *  corresponding to the different inputs in the form. Each key has two keys that have the following values: a boolean that determines whether the data 
 *  type submitted is valid and an array of messages containing any found errors.
 * 
 *  Upon form submission, the 'validating' state will be set to true, which starts a validation sequence inside useEffect. The form data is sent to a
 *  validation route on the backend that generates a validation object that determines whether the data submitted is valid or invalid. For form data
 *  to be considered valid, each input must pass the following checks:
 *     a.) handle:
 *        1.) Must be between 8 - 20 characters in length.
 *        2.) Must be unique.
 *        3.) Must match regular expression (can only contain lowercase letters, uppercase letters and numbers)
 *     b.) username:
 *        1.) Must be between 8 - 20 characters in length.
 *        2.) Must match regular expression (cannot consist of just blank spaces, nor start with a blank space).
 *     c.) password:
 *        1.) Must be between 8 - 20 characters in length.
 *        2.) Must match regular expression (must contain 1 capital letter, 1 lowercase letter, 1 number and 1 special character).
 *     d.) email:
 *        1.) Must be unique.
 *        2.) Must match regular expression (must contain an @ symbol and end with either .com, .edu or .net).
 * 
 *  If the validate object returned from the validation sequence contains any keys with an isValid key that has false as a value, the data is deemed
 *  invalid, the validate object is saved to the 'validateObject' state, and any messages within the validate object are rendered under the appropriate
 *  inputs via the ErrorMessage component. If all the 'isValid' keys have true as a value, the form data is submitted to the sign up route on the backend,
 *  a token is generated containing the user's account information, the token and user information is saved to the 'token' and 'user' state on the main
 *  App component, and the user is redirected to the home page.
 * 
 *  If the user is already logged in (token found in localStorage), the user will be redirected to the home page.
 *  
 */

const SignUpForm = ({ user, signUp, validateSignUp }) => {
    
    const initialState = {
        handle: '',
        username: '',
        password: '',
        email: ''
    }

    /** Any messages inside the messages key will be rendered via the ErrorMessage component.
     */

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

    /** useEffect is primarily used to conduct the validation sequence and determine if the data can be submitted to the sign up route.
     *  If the validate object returned from the 'validateSignUp' function contains any 'isValid' keys that have false as a value, the
     *  data will be considered invalid, and the appropriate error messages will be rendered. Otherwise, the data is submitted to the
     *  backend resulting in creation of an account. A token containing user information is created and saved to both the appropriate
     *  states ('token' and 'user') in the main App component and in localStorage. Additionally the user will be redirected back to the
     *  home page.
     */

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

    /** This function is placed inside each ErrorMessage component instance and allows users to remove the error message from being rendered on the page by
     *  removing the specific message from the 'validateObject' state.
     */

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

    /** The below functions render error messages based on whether the isValid key associated with the form input is false and if the validateObject state
     *  contains any messages within the messages key. 
     */

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