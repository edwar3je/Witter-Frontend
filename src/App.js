import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import WitterApi from './api';
import NavBar from './NavBar';
import Home from './RouteComponents/Home';
import SignUpForm from './RouteComponents/SignUpForm';
import LogInForm from './RouteComponents/LogInForm';
import ProfilePage from './RouteComponents/ProfilePage';
import ProfileEditForm from './RouteComponents/ProfileEditForm';
import SearchPage from './RouteComponents/SearchPage';
import Feed from './RouteComponents/Feed';
import NewWeetForm from './RouteComponents/NewWeetForm';
import Weet from './RouteComponents/Weet';
import WeetEditForm from './RouteComponents/WeetEditForm';
import NotFound from './RouteComponents/NotFound';
import './App.css';

/** This component serves as the main component rendered across the entire app and is primarily used to handle two important states:
 *  token (a json web token that is used with most WitterApi requests) and currentUser (information on the current user).
 */

function App() {

  const initialState = '';
  
  const [currentUser, setCurrentUser] = useState(initialState);
  const [token, setToken] = useState(initialState);

  /** Returns an object containing information on if information submitted for registering a new account is valid. Each key represents a
   *  different piece of data submitted and each contains two keys: a boolean determining if the information submitted is valid and an
   *  array of messages listing each error found.
   */

  const validateSignUp = async (handle, username, password, email) => {
    const result = await WitterApi.validateSignUp(handle, username, password, email);
    return result;
  };

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

  /** Returns an object containing information on if information submitted for editing a profile is valid. Each key represents a
   *  different piece of data submitted and each contains two keys: a boolean determining if the information submitted is valid and an
   *  array of messages listing each error found.
   */

  const validateEditProfile = async (handle, token, formData) => {
    const result = await WitterApi.validateEditProfile(handle, token, formData);
    return result;
  }

  /** A function that is used to edit a user's profile information.
   */

  const editProfile = async (handle, token, formData) => {
    const result = await WitterApi.editProfile(handle, token, formData);
    setToken(result);
    localStorage.setItem('token', result);
    let userData = jwtDecode(result);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  /** A function that is used to delete an account.
   */

  const deleteAccount = async (handle, token) => {
    await WitterApi.deleteAccount(handle, token);
    setCurrentUser(initialState);
    setToken(initialState);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /** A function that retrieves information on accounts with usernames that match a given string. Requires a token to properly use.
   */

  const searchUsers = async (searchString, token) => {
    let users = await WitterApi.searchUsers(searchString, token);
    return users;
  }

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
            <Route exact='true' path='/account/sign-up' element={<SignUpForm user={currentUser} signUp={signUp} validateSignUp={validateSignUp} />} />
            <Route exact='true' path='/account/log-in' element={<LogInForm user={currentUser} logIn={logIn} />} />
            <Route exact='true' path='/profile/:handle' element={<ProfilePage user={currentUser} token={token} getProfile={getProfile} />} />
            <Route exact='true' path='/profile/:handle/edit' element={<ProfileEditForm user={currentUser} token={token} getProfile={getProfile} editProfile={editProfile} validateEditProfile={validateEditProfile} deleteAccount={deleteAccount} />} />
            <Route exact='true' path='/users/' element={<SearchPage user={currentUser} token={token} searchUsers={searchUsers} />} />
            <Route exact='true' path='/weets/' element={<Feed user={currentUser} token={token} getFeed={getFeed} />} />
            <Route exact='true' path='/weets/create' element={<NewWeetForm user={currentUser} token={token} createWeet={createWeet} />} />
            <Route exact='true' path='/weets/:id' element={<Weet user={currentUser} token={token} getWeet={getWeet} />} />
            <Route exact='true' path='/weets/:id/edit' element={<WeetEditForm user={currentUser} token={token} getWeet={getWeet} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
