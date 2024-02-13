import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WitterApi from './api';
import './WeetEditForm.css';

const WeetEditForm = ({ user, token, getWeet }) => {
    
    const initialFormState = {
        weet: ''
    }

    const [formData, setFormData] = useState(initialFormState)
    const [isLoading, setIsLoading] = useState(true);
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
                await WitterApi.editWeet(id, formData, token);
                navigate(`/weets/${id}`);
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
    }, [token, submitting, deleting])

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
                <div>
                    <button onClick={handleInitialDelete}>Delete my weet</button>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={handleDeleteYes}>Yes, please delete my weet</button>
                    <button onClick={handleDeleteNo}>No, do not delete my weet</button>
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
        <div>
            <form className='edit-weet-input-container' onSubmit={handleSubmit}>
                <input type='text' className='edit-weet' id='weet' name='weet' value={formData.weet} onChange={handleChange}></input>
                <button>Submit</button>
            </form>
            {loadDeleteOptions()}
        </div>
    )
};

export default WeetEditForm;