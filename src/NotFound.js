import React from 'react';
import './NotFound.css';

/** This component serves as an area to redirect a user if the url entered does not exist.
 *  Common situations where this component is used includes: the account provided in the url
 *  does not exist, the weet (based on id provided) does not exist, the endpoint does not exist,
 *  and more.
 */

const NotFound = () => {
    return (
        <div className='page-container'>
            <div className='not-found-container'>
                <h2>The url you entered does not exist.</h2>
            </div>
        </div>
    )
};

export default NotFound;