import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';

/** This component is rendered across all routes of the app and changes depending on the 'user' prop (represents the
 *  state 'currentUser' in App.js). If the 'user' prop is null, the navbar will have links to the sign up and log in
 *  forms. If the 'user' prop is not null, the links will lead to several features including viewing the user's profile,
 *  viewing the user's feed, accessing a user search form, accessing a create weet form and a button that allows the user
 *  to log out of their account.
 */

const NavBar = ({ user, logOut }) => {
    
    
    
    const navigate = useNavigate();

    /** A function that logs the user out of their account by resetting the 'token' and 'currentUser' states back to
     *  their initial state and redirecting the user back to the home page.
     */
    
    const logOutFull = (e) => {
        e.preventDefault();
        logOut();
        return navigate('/');
    }

    if(!user){
        return (
            <div className='nav-container'>
                <div className='nav-left-container'>
                    <NavLink className='nav-home' exact='true' to='/'>Witter</NavLink>
                </div>
                <div className='nav-right-container'>
                    <NavLink className='nav-sign-up' exact='true' to='account/sign-up'>Sign Up</NavLink>
                    <NavLink className='nav-login' exact='true' to='account/log-in'>Log In</NavLink>
                </div>
            </div>
        )
    } else {
        return (
            <div className='nav-container'>
                <div className='nav-left-container'>
                    <NavLink className='nav-home' exact='true' to='/'>Witter</NavLink>
                </div>
                <div className='nav-right-container'>
                    <NavLink className='nav-post-weet' exact='true' to='/weets/create'>Post Weet</NavLink>
                    <NavLink className='nav-my-feed' exact='true' to='/weets/'>My Feed</NavLink>
                    <NavLink className='nav-search-users' exact='true' to='/users/'>Search Users</NavLink>
                    <NavLink className='nav-profile' exact='true' to={`/profile/${user.handle}`}>Profile</NavLink>
                    <button className='nav-log-out' onClick={logOutFull}>Log Out</button>
                </div>
            </div>
        )
    }
};

export default NavBar;