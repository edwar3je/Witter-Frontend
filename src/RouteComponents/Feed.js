import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeetCard from '../CardComponents/WeetCard';
import Loader from '../CardComponents/Loader';
import './styles/Feed.css';

const Feed = ({ user, token, getFeed }) => {
    
    const initialState = '';
    const [weets, setWeets] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    /** Upon initial rendering of the component, an API call is made to fetch weets for a user's feed
     *  to store in the 'weets' state, and the 'isLoading' state is set to false.
     */

    useEffect(() => {
        if(token){
            const fetchWeets = async (token) => {
                const results = await getFeed(token)
                setWeets(results);
                setIsLoading(false)
            }
            fetchWeets(token).catch((error) => {
                console.error(error);
            })
        }
    }, [token]);

    /** If a token is not stored in localStorage, the user is deemed not signed in and is redirected to
     *  the home page.
     */

    if(!localStorage.getItem('token')){
        navigate('/');
    }

    if(isLoading){
        return (
            <div className='weets-feed-special-container'>
                <div className='weets-feed-notice'>
                    <Loader />
                </div>
            </div>
        )
    }

    /** If the 'weets' state contains weets, each weet will be rendered in a div using the WeetCard component.
     *  Otherwise, a special message will be generated encouraging the user to either post weets or begin following
     *  other accounts.
     */

    if(weets.length >= 1){
        return (
            <div className='weets-feed-container'>
                    {weets.map(({ id, weet, author, date, time, stats, userInfo, checks }) => {
                        return <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'group'} key={id} />
                    })}
            </div>
        )
    } else {
        return (
            <div className='weets-feed-special-container'>
                <div className='weets-feed-notice'>
                    <h1>Start following accounts or writing weets to fill your feed.</h1>
                </div>
            </div>
        )
    }
};

export default Feed;