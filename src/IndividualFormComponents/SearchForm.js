import React, { useState } from 'react';
import './styles/SearchForm.css';

/** This component renders a form that returns an array of accounts containing usernames that match the string provided in the 'search' state
 *  at form submission. Only part of the username needs to match the 'search' string and the results are case-insensitive. This component is
 *  used in conjunction with the SearchPage component to render the results of the form submission.
 */

const SearchForm = ({ user, token, fetchUsers }) => {

    const initialState = '';
    
    const [search, setSearch] = useState(initialState);

    const handleChange = e => {
        setSearch(e.target.value)
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetchUsers(search, token);
        setSearch(initialState);
    }

    return (
        <form className='search-form-input-container' onSubmit={handleSubmit}>
            <input type='text' className='search' name='search' value={search} onChange={handleChange}></input>
            <button className='search'>
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
                    <path fill="#865bd9" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </button>
        </form>
    )
}

export default SearchForm;