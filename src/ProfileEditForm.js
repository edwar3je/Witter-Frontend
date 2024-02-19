import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import './ProfileEditForm.css';

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

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

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

    // Add in extra check because the object returned sometimes does not contain newPassword as a key

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
            <div>
                Loading...
            </div>
        )
    }

    if(user && user.handle !== handle){
        navigate('/')
    }
    
    return (
        /*<div>
            <div className='profile-edit-general-container'>
                <h2 className='edit-profile-title'>Edit Profile</h2>
                <div>
                    <form className='edit-profile-input-container' onSubmit={handleSubmit}>
                        <div className='edit-profile-username'>
                            <label className='edit-profile-username' htmlFor='username'>Username</label>
                            <input type='text' className='edit-profile' id='username' name='username' value={formData.username} onChange={handleChange}></input>
                            {loadUsernameErrors()}
                        </div>
                        <div className='edit-profile-oldPassword'>
                            <label className='edit-profile-oldPassword' htmlFor='oldPassword'>Current Password</label>
                            <input type='password' className='edit-profile' id='oldPassword' name='oldPassword' value={formData.oldPassword} onChange={handleChange}></input>
                            {loadOldPasswordErrors()}
                        </div>
                        <div className='edit-profile-newPassword'>
                            <label className='edit-profile-newPassword' htmlFor='newPassword'>New Password {'(optional)'}</label>
                            <input type='password' className='edit-profile' id='newPassword' name='newPassword' value={formData.newPassword} onChange={handleChange}></input>
                            {loadNewPasswordErrors()}
                        </div>
                        <div className='edit-profile-email'>
                            <label className='edit-profile-email' htmlFor='email'>Email</label>
                            <input type='text' className='edit-profile' id='email' name='email' value={formData.email} onChange={handleChange}></input>
                            {loadEmailErrors()}
                        </div>
                        <div className='edit-profile-userDescription'>
                            <label className='edit-profile-userDescription' htmlFor='userDescription'>User Description</label>
                            <input type='text' className='edit-profile' id='userDescription' name='userDescription' value={formData.userDescription} onChange={handleChange}></input>
                            {loadUserDescriptionErrors()}
                        </div>
                        <div className='edit-profile-profilePicture'>
                            <label className='edit-profile-profilePicture' htmlFor='profilePicture'>Profile Picture</label>
                            <input type='text' className='edit-profile' id='profilePicture' name='profilePicture' value={formData.profilePicture} onChange={handleChange}></input>
                            {loadProfilePictureErrors()}
                        </div>
                        <div className='edit-profile-bannerPicture'>
                            <label className='edit-profile-bannerPicture' htmlFor='bannerPicture'>Banner Picture</label>
                            <input type='text' className='edit-profile' id='bannerPicture' name='bannerPicture' value={formData.bannerPicture} onChange={handleChange}></input>
                            {loadBannerPictureErrors()}
                        </div>
                        <button className='edit-profile-submit'>Submit</button>
                    </form>
                </div>
                {loadDeleteOptions()}
            </div>
        </div>*/
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