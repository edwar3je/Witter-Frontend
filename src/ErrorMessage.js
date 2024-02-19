import React, { useState } from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, type, remove }) => {
    
    const [display, setDisplay] = useState(true);
    
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