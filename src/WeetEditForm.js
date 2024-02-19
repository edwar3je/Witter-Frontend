import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from './ErrorMessage';
import WitterApi from './api';
import './WeetEditForm.css';

const WeetEditForm = ({ user, token, getWeet }) => {
    
    const initialFormState = {
        weet: ''
    }

    const initialValidObject = {
        weet: {
            isValid: true,
            messages: []
        }
    }

    const [formData, setFormData] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(true);
    const [validateObject, setValidateObject] = useState(initialValidObject);
    const [submitting, setSubmitting] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(token && isLoading){
            const fetchWeet = async () => {
                const results = await getWeet(id, token)
                if(results.author !== user.handle){
                    navigate('/')
                }
                let currFormData = formData;
                currFormData.weet = results.weet;
                setFormData(currFormData);
                setIsLoading(false);
            }
            fetchWeet().catch((error) => {
                console.error(error);
                navigate('/NotFound');
            });
        }
        else if(submitting){
            const handleEdit = async () => {
                let workingValidObject = initialValidObject;
                if(formData.weet === '' || formData.weet.length > 250){
                    workingValidObject.weet.messages.push('A weet must be between 1 to 250 characters in length.')
                }
                const weetRegex1 = new RegExp(/^(?=.*\S).+$/);
                const weetRegex2 = new RegExp(/^[^\s]/);
                if(!weetRegex1.test(formData.weet) || !weetRegex2.test(formData.weet)){
                    workingValidObject.weet.messages.push('A weet cannot consist of just blank spaces, nor start with a blank space.')
                }
                if(workingValidObject.weet.messages.length >= 1){
                    workingValidObject.weet.isValid = false;
                }
                if(!workingValidObject.weet.isValid){
                    setValidateObject(workingValidObject);
                    setSubmitting(false);
                } else {
                    await WitterApi.editWeet(id, formData, token);
                    setValidateObject(initialValidObject);
                    setSubmitting(false);
                    navigate(`/weets/${id}`);
                }
            }
            handleEdit().catch((error) => {
                console.error(error)
            });
        }
        else if(deleting){
            const handleDelete = async () => {
                await WitterApi.deleteWeet(id, token);
                navigate(`/profile/${user.handle}`);
            }
            handleDelete().catch((error) => {
                console.error(error)
            });
        }
    }, [token, submitting, deleting, validateObject])

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
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitting(true);
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
                <div className='delete-options-container'>
                    <button className='init-delete-button' onClick={handleInitialDelete}>Delete my weet</button>
                </div>
            )
        } else {
            return (
                <div className='delete-options-container'>
                    <button className='yes-delete-button' onClick={handleDeleteYes}>Yes, please delete my weet</button>
                    <button className='no-delete-button' onClick={handleDeleteNo}>No, do not delete my weet</button>
                </div>
            )
        }
    }

    if(!localStorage.getItem('token')){
        navigate('/');
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div className='page-container'>
            <div className='edit-weet-general-container'>
                <div className='edit-weet-title-container'>
                    <h2 className='edit-weet-title'>Edit Weet</h2>
                </div>
                <form className='edit-weet-input-container' onSubmit={handleSubmit}>
                    {loadDeleteOptions()}
                    <div className='edit-weet-weet'>
                        <textarea className='edit-weet' id='weet' name='weet' value={formData.weet} onChange={handleChange}></textarea>
                        {loadWeetErrors()}
                    </div>
                    <div className='button-container'>
                        <button className='edit-weet-submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default WeetEditForm;