import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from '../CardComponents/ErrorMessage';
import Loader from '../CardComponents/Loader';
import './styles/ProfileEditForm.css';

/** This component renders a form that allows users to edit various parts of their profile. The component uses frontend error
 *  handling to ensure only valid data is sent to the backend. Upon initial render, the component will fetch the user's current profile
 *  information (save for their current password) and place the information within the appropriate form inputs. The component will also 
 *  generate a 'validateObject' that contains multiple keys each corresponding to the different inputs in the form. Each key has two keys 
 *  that have the following values: a boolean that determines whether the data type submitted is valid and an array of messages 
 *  containing any found errors. Regardless of what data is being changed, the user must submit their current password for any change to be 
 *  considered valid.
 * 
 *  Upon form submission, the 'validating' state is changed to true, which starts a validation sequence inside useEffect. The form data
 *  is sent to a validation route on the backend that generates a validation object that determines whether the data submitted is valid
 *  or invalid. For form data to be considered valid, each input must pass the following checks:
 *     a.) username: 
 *        1.) Must be between 8 - 20 characters in length.
 *        2.) Must match regular expression (cannot consist of just blank spaces, nor start with a blank space).
 *     b.) oldPassword (required):
 *        1.) Must match the password associated with the handle on the backend. 
 *     c.) newPassword (optional):
 *        1.) Must be between 8 - 20 characters in length.
 *        2.) Cannot match the current user's password stored on the backend.
 *        3.) Must match regular expression (must contain 1 capital letter, 1 lowercase letter, 1 number and 1 special character).
 *     d.) email: 
 *        1.) Must either be unique or the same email associated with the handle on the backend.
 *        2.) Must match regular expression (must contain an @ symbol and end with either .com, .edu or .net).
 *     e.) userDescription:
 *        1.) Must be less than or equal to 250 characters in length.
 *        2.) Must match regular expression (cannot consist of just blank spaces, nor start with a blank space).
 *     f.) profilePicture:
 *        1.) Must match regular expression (url must contain either 'http' or 'https' as a protocol, followed by a valid image extension (jpg, jpeg or png)).
 *     g.) bannerPicture:
 *        1.) Must match regular expression (url must contain either 'http' or 'https' as a protocol, followed by a valid image extension (jpg, jpeg or png)).
 * 
 *  If the validate object returned from the validation sequence contains any keys with an isValid key that has false as a value, the data is deemed
 *  invalid, the validate object is saved to the 'validateObject' state, and any messages within the validate object are rendered under the appropriate
 *  inputs via the ErrorMessage component. If all the 'isValid' keys have true as a value, the form data is submitted to the edit profile route on the
 *  backend, and the user is redirected to their profile page.
 * 
 *  Users can also choose to delete their profile by clicking the 'Delete my account' button along with another button asking for confirmation. Doing so will
 *  delete the account on the backend, log the user out of their account (remove information on user and token from state and localStorage) and redirect the
 *  user to the home page.
 * 
 *  If the user is not logged in (token not found in localStorage), or the user is not the owner of the account (user.handle !== handle), the user will be
 *  redirected to the home page. Alternatively, if the handle within the url does not match any account stored on the backend, the user will be redirected
 *  to the 'Not Found' page.
 * 
 */

const ProfileEditForm = ({ user, token, getProfile, editProfile, validateEditProfile, deleteAccount }) => {

    const initialFormState = {
        username: '',
        oldPassword: '',
        newPassword: '',
        email: '',
        userDescription: '',
        profilePicture: '',
        bannerPicture: ''
    };

    /** Any messages inside the messages key will be rendered via the ErrorMessage component.
     */

    const initialValidObject = {
        username: {
            isValid: true,
            messages: []
        },
        oldPassword: {
            isValid: true,
            messages: []
        },
        newPassword: {
            isValid: true,
            messages: []
        },
        email: {
            isValid: true,
            messages: []
        },
        userDescription: {
            isValid: true,
            messages: []
        },
        profilePicture: {
            isValid: true,
            messages: []
        },
        bannerPicture: {
            isValid: true,
            messages: []
        }
    };

    const navigate = useNavigate();

    const { handle } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(initialFormState);
    const [validateObject, setValidateObject] = useState(initialValidObject);
    const [validating, setValidating] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    /** useEffect has three primary functions within this component. The first is to fetch any existing profile data on the initial render
     *  (if it exists). The second is to conduct a validation sequence that either results in form data being submitted to the edit profile
     *  route on the backend, or changing the 'validateObject' state resulting in the rendering of error messages. The final function is
     *  to delete a user's profile if the user clicks on the initial delete button followed by clicking 'Yes' on the second delete prompt.
      */

    useEffect(() => {
        if(token && isLoading){
            const fetchProfile = async (handle, token) => {
                const fetchedProfile = await getProfile(handle, token);
                const { username, email, user_description, profile_image, banner_image } = fetchedProfile;
                let profileData = formData;
                profileData.username = username;
                profileData.email = email;
                profileData.userDescription = user_description;
                profileData.profilePicture = profile_image;
                profileData.bannerPicture = banner_image;
                setFormData(profileData);
                setIsLoading(false);
            }
            fetchProfile(user.handle, token).catch((error) => {
                console.error(error);
                navigate('/NotFound');
            });
        } else if(token && validating){
            const handleValidate = async () => {
                let pass = true;
                const result = await validateEditProfile(handle, token, formData);
                for(let key in result){
                    if(!result[key].isValid){
                        pass = false;
                    }
                }
                if(!pass){
                    setValidateObject(result);
                    setValidating(false);
                } else {
                    await editProfile(handle, token, formData);
                    setFormData(initialFormState);
                    setValidateObject(initialValidObject);
                    setValidating(false);
                    navigate(`/profile/${handle}`);
                }
            }
            handleValidate();
        } else if(token && deleting){
            const handleDelete = async () => {
                await deleteAccount(handle, token);
                setDeleting(false);
                navigate('/');
            }
            handleDelete().catch((error) => {
                console.error(error);
            });
        }
    }, [token, validateObject, validating, deleting]);

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

    const loadUsernameErrors = () => {
        if(!validateObject.username.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.username.messages.map((message) => {
                        return <ErrorMessage message={message} type={'username'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    }

    const loadOldPasswordErrors = () => {
        if(!validateObject.oldPassword.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.oldPassword.messages.map((message) => {
                        return <ErrorMessage message={message} type={'oldPassword'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    }

    // This specific function requires an extra check because newPassword is not always submitted.

    const loadNewPasswordErrors = () => {
        if(validateObject.newPassword && !validateObject.newPassword.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.newPassword.messages.map((message) => {
                        return <ErrorMessage message={message} type={'newPassword'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    }

    const loadEmailErrors = () => {
        if(!validateObject.email.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.email.messages.map((message) => {
                        return <ErrorMessage message={message} type={'email'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    }

    const loadUserDescriptionErrors = () => {
        if(!validateObject.userDescription.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.userDescription.messages.map((message) => {
                        return <ErrorMessage message={message} type={'userDescription'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    }

    const loadProfilePictureErrors = () => {
        if(!validateObject.profilePicture.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.profilePicture.messages.map((message) => {
                        return <ErrorMessage message={message} type={'profilePicture'} remove={removeMessage} key={uuidv4()} />
                    })}
                </div>
            );
        }
    }

    const loadBannerPictureErrors = () => {
        if(!validateObject.bannerPicture.isValid){
            return (
                <div className='errors-container'>
                    {validateObject.profilePicture.messages.map((message) => {
                        return <ErrorMessage message={message} type={'bannerPicture'} remove={removeMessage} key={uuidv4()} />
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
    }

    /** The following four functions control the rendering and functionality of the 'delete buttons'. The initial delete button will change the 'displayDelete' 
     *  state to true, which renders the delete prompt buttons. Clicking the 'delete no button' will return the displayDelete state to false, causing the initial 
     *  delete button to rerender and the delete prompt buttons to unrender. Clicking the 'delete yes button' will change the 'deleting' state to true, causing 
     *  the account to be deleted on the backend, log the user out and redirect the user back to the home page.
     */

    const handleInitialDelete = e => {
        e.preventDefault();
        setDisplayDelete(true);
    }

    const handleDeleteYes = e => {
        e.preventDefault();
        setDeleting(true);
    }

    const handleDeleteNo = e => {
        e.preventDefault();
        setDisplayDelete(false);
    }

    const loadDeleteOptions = () => {
        if(!displayDelete){
            return (
                <div className='edit-profile-delete-container'>
                    <button className='edit-profile-init-delete' onClick={handleInitialDelete}>Delete my account</button>
                </div>
            )
        } else {
            return(
                <div className='edit-profile-delete-container'>
                    <button className='edit-profile-yes-delete' onClick={handleDeleteYes}>Yes, please delete my account</button>
                    <button className='edit-profile-no-delete' onClick={handleDeleteNo}>No, do not delete my account</button>
                </div>
            )
        }
    }

    if(!localStorage.getItem('token')){
        navigate('/')
    }

    if(isLoading){
        return (
            <div className='edit-profile-page-container'>
                <div className='edit-profile-load-container'>
                    <Loader />
                </div>
            </div>
        )
    }

    /*if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }*/

    if(user && user.handle !== handle){
        navigate('/')
    }
    
    return (
        <div className='edit-profile-page-container'>
            <div className='edit-profile-general-container'>

                <div className='edit-profile-title-container'>
                    <h2 className='edit-profile-title'>Edit Profile</h2>
                </div>

                {loadDeleteOptions()}

                <form className='edit-profile-general-input-container' onSubmit={handleSubmit}>
                    <div className='edit-profile-input-container'>
                        <div className='edit-profile-input-left-container'>
                            
                            <div className='edit-profile-username'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='username'>Username</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <input type='text' className='edit-profile' id='username' name='username' value={formData.username} onChange={handleChange}></input>
                                    {loadUsernameErrors()}
                                </div>  
                            </div>

                            <div className='edit-profile-oldPassword'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='oldPassword'>{'Current Password (required)'}</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <input type='password' className='edit-profile' id='oldPassword' name='oldPassword' value={formData.oldPassword} onChange={handleChange}></input>
                                    {loadOldPasswordErrors()}
                                </div>
                            </div>

                            <div className='edit-profile-profilePicture'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='profilePicture'>Profile Picture</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <textarea className='edit-profile' id='profilePicture' name='profilePicture' value={formData.profilePicture} onChange={handleChange}></textarea>
                                    {loadProfilePictureErrors()}
                                </div>
                            </div>

                            <div className='edit-profile-userDescription'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='userDescription'>User Description</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <textarea className='edit-profile' id='userDescription' name='userDescription' value={formData.userDescription} onChange={handleChange}></textarea>
                                    {loadUserDescriptionErrors()}
                                </div>
                            </div>

                        </div>

                        <div className='edit-profile-input-right-container'>
                            
                            <div className='edit-profile-email'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='email'>Email</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <input type='text' className='edit-profile' id='email' name='email' value={formData.email} onChange={handleChange}></input>
                                    {loadEmailErrors()}
                                </div>
                            </div>

                            <div className='edit-profile-newPassword'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='newPassword'>New Password {'(optional)'}</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <input type='password' className='edit-profile' id='newPassword' name='newPassword' value={formData.newPassword} onChange={handleChange}></input>
                                    {loadNewPasswordErrors()}
                                </div>
                            </div>

                            <div className='edit-profile-bannerPicture'>
                                <div className='edit-profile-left-container'>
                                    <label className='edit-profile' htmlFor='bannerPicture'>Banner Picture</label>
                                    <div className='filler'></div>
                                </div>
                                <div className='edit-profile-right-container'>
                                    <textarea className='edit-profile' id='bannerPicture' name='bannerPicture' value={formData.bannerPicture} onChange={handleChange}></textarea>
                                    {loadBannerPictureErrors()}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='edit-profile-button-container'>
                        <button className='edit-profile-submit'>Submit</button>
                    </div>
                    
                </form>

            </div>

        </div>
    )
};

export default ProfileEditForm;