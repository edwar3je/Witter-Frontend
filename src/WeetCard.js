import React, { useState } from 'react';
import './WeetCard.css';

const WeetCard = ({id, weet, author, date, time, stats, userInfo, checks, user, token}) => {
    
    const [isReweeted, setIsReweeted] = useState(checks.reweeted);
    const [isFavorited, setIsFavorited] = useState(checks.favorited);
    const [isTabbed, setIsTabbed] = useState(checks.tabbed);
    
    const reweet = e => {
        e.preventDefault();
        setIsReweeted(true);
        console.log('weet reweeted');
    }

    const unreweet = e => {
        e.preventDefault();
        setIsReweeted(false);
        console.log('weet unreweeted');
    }
    
    const reweetButton = () => {
        if(isReweeted){
            return (
                <button onClick={unreweet}>Unreweet</button>
            )
        } else {
            return (
                <button onClick={reweet}>Reweet</button>
            )
        }
    }

    const favorite = e => {
        e.preventDefault();
        setIsFavorited(true);
        console.log('weet favorited');
    }

    const unfavorite = e => {
        e.preventDefault();
        setIsFavorited(false);
        console.log('weet unfavorited');
    }
    
    const favoriteButton = () => {
        if(isFavorited){
            return (
                <button onClick={unfavorite}>Unfavorite</button>
            )
        } else {
            return (
                <button onClick={favorite}>Favorite</button>
            )
        }
    }

    const tab = e => {
        e.preventDefault();
        setIsTabbed(true);
        console.log('weet tabbed');
    }

    const untab = e => {
        e.preventDefault();
        setIsTabbed(false);
        console.log('weet untabbed');
    }

    const tabButton = () => {
        if(isTabbed){
            return (
                <button onClick={untab}>Untab</button>
            )
        } else {
            return (
                <button onClick={tab}>Tab</button>
            )
        }
    }
    
    return(
        <div className='general-weet-container'>
            <div className='author-date-container'>
                <h1>{author}</h1>
                <h2>{date}</h2>
                <h2>{time}</h2>
            </div>
            <div className='weet-container'>
                <p>{weet}</p>
            </div>
            <div className='buttons-container'>
                {reweetButton}
                {favoriteButton}
                {tabButton}
            </div>
        </div>
    )
}

export default WeetCard;