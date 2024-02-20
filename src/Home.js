import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/** This component serves as the home page for the application and changes depending on the 'user' prop
 *  (represents the 'currentUser' state on the main App component). If the 'user' prop is null, the home
 *  page will display a few buttons containing links to the sign up and log in forms. If the 'user' prop
 *  is not null, the home page will display a greeting for the logged in user based on the 'user' prop.
 */

const Home = ({ user }) => {
    
    if(!user){
        return (
            <div className='page-container'>
                <div className='home-container'>
                    <div className='home-welcome-container'>
                        <h1>Welcome to Witter!</h1>
                        <h2>A twitter clone.</h2>
                    </div>
                    <div className='home-button-container'>
                        <button className='home-buttons'>
                            <Link className='home-buttons-text' exact='true' to='/account/sign-up'>Sign up</Link>
                        </button>
                        <button className='home-buttons'>
                            <Link className='home-buttons-text' exact='true' to='/account/log-in'>Log in</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='page-container'>
                <div className='home-container'>
                    <div className='home-welcome-container'>
                        <h1>Welcome back {user.username}!</h1>
                    </div>
                </div>
            </div>
        )
    }

};

export default Home;