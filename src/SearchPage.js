import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import UserCard from './UserCard';
import './SearchPage.css';

const SearchPage = ({ user, token, searchUsers }) => {
    
    const initialState = '';

    const navigate = useNavigate();

    const [searchString, setSearchString] = useState(initialState);
    const [users, setUsers] = useState(initialState);

    if(!localStorage.getItem('token')){
        return navigate('/');
    }

    const fetchUsers = async (searchString, token) => {
        if(searchString !== ''){
            const results = await searchUsers(searchString, token);
            setUsers(results);
            setSearchString(searchString);
        }
    }

    const loadSearchResults = () => {
        if(users !== ''){
            if(users.length >= 1){
                return (
                    <div>
                        {users.map(({handle, username, user_description, profile_image, banner_image, followStatus}) => {
                            return <UserCard handle={handle} username={username} user_description={user_description} profile_image={profile_image} banner_image={banner_image} followStatus={followStatus} user={user} token={token} key={handle}/>
                        })}
                    </div>
                )
            }
            return (
                <div>
                    <h1>There are no accounts with a username matching {searchString}</h1>
                </div>
            );
        }
    }
    
    return (
        <div>
            <SearchForm user={user} token={token} fetchUsers={fetchUsers} />
            {loadSearchResults()}
        </div>
    )
};

export default SearchPage;