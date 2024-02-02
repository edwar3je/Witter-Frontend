import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
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
  
  const signUp = async () => {
    let token = await WitterApi.signUp(data);
    setToken(token);
    localStorage.setItem('token', token);
    let userData = jwt.decode(token);
    setCurrentUser(userData);
    localStorage.setItem('user', userData);
  };

  /** A function that is used when the log in form is submitted. Upon submission, the 'logIn' static method from the WitterApi class
   *  is used to authenticate the user credentials provided and (if succesful) return a json web token containing the account information.
   *  The token is then saved to both the 'token' state and localStorage. Additionally, the token is decoded and the information stored
   *  is saved to both the 'currentUser' state and localStorage.
   */

  const logIn = async () => {
    let token = await WitterApi.logIn(data);
    setToken(token);
    localStorage.setItem('token', token);
    let userData = jwt.decode(token);
    setCurrentUser(userData);
    localStorage.setItem('user', userData);
  };

  /** A function that is used to log the user out of their account by changing both 'token' and 'currentUser' states back to their
   *  initial states, and removing any associated information from localStorage.
   */
  
  const logOut = () => {
    setCurrentUser(initialState);
    setToken(initialState);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  /** A function that is used to check if the user is currently logged in even if the state of 'currentUser' is currently in its initial
   *  state. If there is any information stored in localStorage for 'currentUser', both the 'currentUser' and 'token' states are set to 
   *  any associated information within localStorage.
   */

  const isAlreadyLoggedIn = () => {
    if(localStorage.getItem('currentUser') && !currentUser){
      const loggedInUser = localStorage.getItem('currentUser');
      const loggedInToken = localStorage.getItem('token');
      setCurrentUser(loggedInUser);
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
            <Route exact='true' path='/profile/:handle' element={<ProfilePage user={currentUser} token={token} />} />
            <Route exact='true' path='/profile/:handle/edit' element={<ProfileEditForm user={currentUser} token={token} />} />
            <Route exact='true' path='/profile/:handle/weets' element={<ProfileWeets user={currentUser} token={token} />} />
            <Route exact='true' path='/profile/:handle/reweets' element={<ProfileReweets user={currentUser} token={token} />} />
            <Route exact='true' path='/profile/:handle/favorites' element={<ProfileFavorites user={currentUser} token={token} />} />
            <Route exact='true' path='/profile/:handle/tabs' element={<ProfileTabs user={currentUser} token={token} />} />
            <Route exact='true' path='/users/' element={<SearchResults user={currentUser} token={token} />} />
            <Route exact='true' path='/weets/' element={<Feed user={currentUser} token={token} />} />
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
