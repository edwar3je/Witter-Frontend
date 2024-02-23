import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from '../CardComponents/ErrorMessage';
import WitterApi from '../api';
import './styles/WeetEditForm.css';

/** This component renders a form that allows users to edit their weets based on the id provided in the url. The component uses simple frontend
 *  error handling to ensure only valid data is sent to the backend. Upon initial render, the component will fetch the contents of the weet and
 *  place the information inside the 'weet' key stored within the 'formData' state. If the function call catches any errors (weet not found),
 *  the user will be redirected to the 'Not Found' page. If the user is not the author of the weet, or is not currently logged in, the user will
 *  be redirected to the home page. The initial render also generates a 'validateObject' that contains two keys used for data validation: a
 *  boolean that determines if the data submitted is valid and an array of messages containing any errors found.
 * 
 *  Upon form submission, the 'submitting' state is set to true, which begins a validation sequence inside useEffect. The form data is evaluated
 *  to generate a validation object to determine if the data submitted is valid. If the 'isValid' key from the returned object has a value of true, 
 *  the data is sent to the backend, the text of the weet is changed to the data submitted and the user is redirected to a page containing the newly 
 *  edited weet. If the 'isValid' key has a value of false, the 'validateObject' state is set to the validation object returned and the appropriate 
 *  error messages are rendered using the ErrorMessage component.
 *  
 *  For the data to be considered valid, the weet submitted must pass the following checks:
 *     1.) The weet is less than or equal to 250 characters in length.
 *     2.) The weet meets the regular expression (cannot consist of just empty spaces nor begin with an empty space).
 *  
 *  Users can also choose to delete their weet by clicking the 'Delete my weet' button along with another button asking for confirmation. Doing so will
 *  delete the weet on the backend and redirect the user to their profile page.
 * 
 */

const WeetEditForm = ({ user, token, getWeet }) => {
    
    const initialFormState = {
        weet: ''
    }

    /** Any messages inside the messages key will be rendered via the ErrorMessage component.
     */

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

    /** useEffect has three primary functions within this component. The first is to fetch any existing weet data on the initial render
     *  (if it exists). The second is to conduct a validation sequence that determines whether the data submitted is valid to send to
     *  the official edit weet route on the backend, or changing the 'validateObject' state resulting in the rendering of error messages.
     *  The final function is to delete the weet if the user clicks on the initial delete button, followed by clicking 'Yes' on the second
     *  delete prompt.
    */

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

    /** This function is placed inside each ErrorMessage component instance and allows users to remove the error message from being rendered on the page by
     *  removing the specific message from the 'validateObject' state.
     */

    const removeMessage = (type, message) => {
        let curValidObject = validateObject;
        const delIndex = curValidObject[type].messages.indexOf(message);
        curValidObject[type].messages.splice(delIndex, 1);
        setValidateObject(curValidObject);
    }

    /** This function renders error messages based on whether the isValid key associated with the form input is false and if the validateObject state contains
     *  any messages within the messages key.
     */

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

    /** The following four functions control the rendering and functionality of the 'delete buttons'. The initial delete button will change the 'displayDelete'
     *  state to true, which renders the delete prompt buttons. Clicking the 'delete no button' will return the displayDelete state to false, causing the initial
     *  delete button to rerender and the delete prompt buttons to unrender. Clicking the 'delete yes button' will change the 'deleting' state to true, causing
     *  the weet to be deleted on the backend and redirect the user to their profile page.
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