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
import ProfileWeets from './ProfileWeets';
import ProfileReweets from './ProfileReweets';
import ProfileFavorites from './ProfileFavorites';
import ProfileTabs from './ProfileTabs';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowing from './ProfileFollowing';
import SearchResults from './SearchResults';
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

  /** A function that is used to retrieve an array of weets written by an account.
   */

  const getWeets = async (handle, token) => {
    return 'getWeets'
  }

  /** A function that is used to retrieve an array of weets an account has reweeted.
   */

  const getReweets = async (handle, token) => {
    return 'getReweets'
  }

  /** A function that is used to retrieve an array of weets an account has favorited.
   */

  const getFavorites = async (handle, token) => {
    return 'getFavorites'
  }

  /** A function that is used to retrieve an array of weets an account has tabbed.
   */

  const getTabs = async (handle, token) => {
    return 'getTabs'
  };

  /** A function that is used to retrieve an array of accounts that follow an account.
   */

  const getFollowers = async (handle, token) => {
    return 'getFollowers';
  };

  /** A function that is used to retrieve an array of accounts an account is following.
   */

  const getFollowing = async (handle, token) => {
    return 'getFollowing';
  };

  /** A function that is used to retrieve an array of weets that represents a user's feed.
   */

  const getFeed = async (handle, token) => {
    return 'getFeed'
  };

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
      console.log('Logged in');
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
            <Route exact='true' path='/profile/:handle/weets' element={<ProfileWeets user={currentUser} token={token} getWeets={getWeets} />} />
            <Route exact='true' path='/profile/:handle/reweets' element={<ProfileReweets user={currentUser} token={token} getReweets={getReweets} />} />
            <Route exact='true' path='/profile/:handle/favorites' element={<ProfileFavorites user={currentUser} token={token} getFavorites={getFavorites} />} />
            <Route exact='true' path='/profile/:handle/tabs' element={<ProfileTabs user={currentUser} token={token} getTabs={getTabs} />} />
            <Route exact='true' path='/profile/:handle/followers' element={<ProfileFollowers user={currentUser} token={token} getFollowers={getFollowers} /> } />
            <Route exact='true' path='/profile/:handle/following' element={<ProfileFollowing user={currentUser} token={token} getFollowing={getFollowing} /> } />
            <Route exact='true' path='/users/' element={<SearchResults user={currentUser} token={token} />} />
            <Route exact='true' path='/weets/' element={<Feed user={currentUser} token={token} getFeed={getFeed} />} />
            <Route exact='true' path='/weets/create' element={<NewWeetForm user={currentUser} token={token} />} />
            <Route exact='true' path='/weets/:id' element={<Weet user={currentUser} token={token} />} />
            <Route exact='true' path='/weets/:id/edit' element={<WeetEditForm user={currentUser} token={token} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
