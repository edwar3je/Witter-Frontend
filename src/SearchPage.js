import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import UserCard from './UserCard';
import './SearchPage.css';

/** This component renders a page that contains another form component used to search for accounts that contain usernames that match the string
 *  provided in the form. Upon initial render, the 'searchString' and 'users' states are each given an empty string as a value. Upon form
 *  submission (when the 'searchString' state changes), an API call is made that uses the searchString provided by the form (along with the token
 *  stored in the token prop) to fetch accounts that contain usernames that match searchString. The results of the API call are kept inside 'users'
 *  to properly render the results of the API call below the SearchForm component. The usernames do not need to fully match the value in
 *  searchString, but do need to include the searchString (case insensitive).
 * 
 *  If 'users' contains any accounts, the accounts will be rendered via the UserCard component within a div below the SearchForm component. If
 *  'users' does not contain any accounts, a special message will be generated within the div below the SearchForm component informing the user
 *  that there are no accounts containing usernames that include the given search string.
 * 
 *  If the user is not currently logged in (token is not found in localStorage), the user will be redirected to the home page.
 * 
 */

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
                    <>
                        <hr></hr>
                        <div className='users-container'>
                            {users.map(({handle, username, user_description, profile_image, banner_image, followStatus}) => {
                                return <UserCard handle={handle} username={username} user_description={user_description} profile_image={profile_image} banner_image={banner_image} followStatus={followStatus} user={user} token={token} key={handle}/>
                            })}
                        </div>
                    </>
                )
            }
            return (
                <>
                    <hr></hr>
                    <div className='user-notice-container'>
                        <h1>There are no accounts with a username matching {searchString}</h1>
                    </div>
                </>
            );
        }
    }
    
    return (
        <div className='main-search-page-container'>
            <div className='search-page-container'>
                <SearchForm user={user} token={token} fetchUsers={fetchUsers} />
            </div>
            {loadSearchResults()}
        </div>
        
    )
};

export default SearchPage;