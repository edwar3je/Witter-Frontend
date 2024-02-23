import React, { useState } from 'react';
import './styles/ErrorMessage.css';

/** This component renders an error message div containing an error message based on the 'message' prop.
 *  The component can also be removed via clicking a button that will remove the associated message being
 *  stored on the parent component rendering the error message and setting the 'display' state of the 
 *  component to false.
 */

const ErrorMessage = ({ message, type, remove }) => {
    
    const [display, setDisplay] = useState(true);

    /** This function executes upon clicking the 'X' button on the component. The function removes the
     *  associated error message from the parent component's state and sets the 'display' state of the
     *  existing error message of the component to false.
     */
    
    const removeMessage = e => {
        e.preventDefault();
        remove(type, message);
        setDisplay(false);
    }

    if(display){
        return (
            <div className='error-container'>
                <div className='error-message-container'>
                    <p>{message}</p>
                </div>
                <div className='error-button-container'>
                    <button onClick={removeMessage}>X</button>
                </div>
            </div>
        )
    }
};

export default ErrorMessage;