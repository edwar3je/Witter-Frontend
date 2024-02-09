import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import WitterApi from './api';
import NavBar from './NavBar';
import Home from './Home';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import ProfilePage from './ProfilePage';
import ProfileEditForm from './ProfileEditForm';
import SearchPage from './SearchPage';
import Feed from './Feed';
import NewWeetForm from './NewWeetForm';
import Weet from './Weet';
import WeetEditForm from './WeetEditForm';
import NotFound from './NotFound';
import './App.css';

function App() {

  const initialState = '';

  /** This component serves as the main component rendered across the entire app and is primarily used to handle two important states:
   *  token (a json web token that is used with most WitterApi requests) and currentUser (information on the current user).
   */
  
  const [currentUser, setCurrentUser] = useState(initialState);
  const [token, setToken] = useState(initialState);

  /** A function that is used when the sign up (register) form is submitted. Upon submission, the 'signUp' static method from the
   *  WitterApi class is used to create a new account on the backend and return a json web token containing the new account information. 
   *  The token is then saved to the 'token' state and saved in localStorage. Additionally, the token is decoded and the information
   *  stored is saved to both the 'currentUser' state and localStorage.
   */
  
  const signUp = async (data) => {
    let token = await WitterApi.signUp(data);
    setToken(token);
    localStorage.setItem('token', token);
    let userData = jwtDecode(token);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /** A function that is used when the log in form is submitted. Upon submission, the 'logIn' static method from the WitterApi class
   *  is used to authenticate the user credentials provided and (if succesful) return a json web token containing the account information.
   *  The token is then saved to both the 'token' state and localStorage. Additionally, the token is decoded and the information stored
   *  is saved to both the 'currentUser' state and localStorage.
   */

  const logIn = async (data) => {
    let token = await WitterApi.logIn(data);
    setToken(token);
    localStorage.setItem('token', token);
    let userData = jwtDecode(token);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /** A function that is used to log the user out of their account by changing both 'token' and 'currentUser' states back to their
   *  initial states, and removing any associated information from localStorage.
   */
  
  const logOut = () => {
    setCurrentUser(initialState);
    setToken(initialState);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  /** A function that retrieves information on a given account's profile information. Requires a token to properly use.
   */

  const getProfile = async (handle, token) => {
    let profile = await WitterApi.getProfile(handle, token);
    return profile;
  }

  /** A function that is used to edit a user's profile information.
   */

  const editProfile = async (handle, token, formData) => {
    return 'editProfile';
  }

  /** A function that retrieves information on accounts with usernames that match a given string. Requires a token to properly use.
   */

  const searchUsers = async (searchString, token) => {
    let users = await WitterApi.searchUsers(searchString, token);
    return users;
  }

  /** A function that is used to retrieve an array of accounts that follow an account.
   */

  /*const getFollowers = async (handle, token) => {
    let followers = await WitterApi.getFollowers(handle, token);
    return followers;
  };*/

  /** A function that is used to retrieve an array of accounts an account is following.
   */

  /*const getFollowing = async (handle, token) => {
    let following = await WitterApi.getFollowing(handle, token);
    return following;
  };*/

  /** A function that is used to retrieve an array of weets that represents a user's feed.
   */

  const getFeed = async (token) => {
    let feed = await WitterApi.getFeed(token);
    return feed;
  };

  /** A function that is used to retrieve a single weet based on the id provided.
   */

  const getWeet = async (id, token) => {
    let weet = await WitterApi.getWeet(id, token);
    return weet;
  }

  /** A function that is used to create a new weet and send the information to the backend.
   */

  const createWeet = async (weet, token) => {
    await WitterApi.createWeet(weet, token);
    return 'Witt succesfully created';
  }

  /** A function that is used to check if the user is currently logged in even if the state of 'currentUser' is currently in its initial
   *  state. If there is any information stored in localStorage for 'currentUser', both the 'currentUser' and 'token' states are set to 
   *  any associated information within localStorage.
   */

  const isAlreadyLoggedIn = () => {
    if(localStorage.getItem('user') && !currentUser){
      const loggedInUser = localStorage.getItem('user');
      const loggedInToken = localStorage.getItem('token');
      setCurrentUser(JSON.parse(loggedInUser));
      setToken(loggedInToken);
    }
  };

  isAlreadyLoggedIn();


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={currentUser} logOut={logOut}/>
        <main>
          <Routes>
            <Route exact='true' path='/' element={<Home user={currentUser} />} />
            <Route exact='true' path='/account/sign-up' element={<SignUpForm user={currentUser} signUp={signUp} />} />
            <Route exact='true' path='/account/log-in' element={<LogInForm user={currentUser} logIn={logIn} />} />
            <Route exact='true' path='/profile/:handle' element={<ProfilePage user={currentUser} token={token} getProfile={getProfile} />} />
            <Route exact='true' path='/profile/:handle/edit' element={<ProfileEditForm user={currentUser} token={token} getProfile={getProfile} editProfile={editProfile} />} />
            <Route exact='true' path='/users/' element={<SearchPage user={currentUser} token={token} searchUsers={searchUsers} />} />
            <Route exact='true' path='/weets/' element={<Feed user={currentUser} token={token} getFeed={getFeed} />} />
            <Route exact='true' path='/weets/create' element={<NewWeetForm user={currentUser} token={token} createWeet={createWeet} />} />
            <Route exact='true' path='/weets/:id' element={<Weet user={currentUser} token={token} getWeet={getWeet}/>} />
            <Route exact='true' path='/weets/:id/edit' element={<WeetEditForm user={currentUser} token={token} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
