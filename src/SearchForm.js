import React, { useState } from 'react';
import './SearchForm.css';

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
        <form onSubmit={handleSubmit}>
            <input type='text' className='search-users' name='search' value={search} onChange={handleChange}></input>
            <button className='search-users-submit'>Search</button>
        </form>
    )
}

export default SearchForm;