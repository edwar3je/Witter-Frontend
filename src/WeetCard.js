import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WitterApi from './api';
import './WeetCard.css';

const WeetCard = ({id, weet, author, date, time, stats, userInfo, checks, user, token, setting}) => {
    
    const [isReweeted, setIsReweeted] = useState(checks.reweeted);
    const [reweetStat, setReweetStat] = useState(stats.reweets);
    const [isFavorited, setIsFavorited] = useState(checks.favorited);
    const [favoriteStat, setFavoriteStat] = useState(stats.favorites);
    const [isTabbed, setIsTabbed] = useState(checks.tabbed);
    const [tabStat, setTabStat] = useState(stats.tabs);
    
    const reweet = async e => {
        e.preventDefault();
        await WitterApi.reweet(id, token);
        setIsReweeted(true);
        setReweetStat(reweetStat + 1);
    }

    const unreweet = async e => {
        e.preventDefault();
        await WitterApi.unreweet(id, token);
        setIsReweeted(false);
        setReweetStat(reweetStat - 1);
    }
    
    const reweetButton = () => {
        if(isReweeted){
            return (
                <>
                    <button onClick={unreweet}>Unreweet</button>
                    <p>{reweetStat}</p>
                </>
            )
        } else {
            return (
                <>
                    <button onClick={reweet}>Reweet</button>
                    <p>{reweetStat}</p>
                </>
            )
        }
    }

    const favorite = async e => {
        e.preventDefault();
        await WitterApi.favorite(id, token);
        setIsFavorited(true);
        setFavoriteStat(favoriteStat + 1);
    }

    const unfavorite = async e => {
        e.preventDefault();
        await WitterApi.unfavorite(id, token);
        setIsFavorited(false);
        setFavoriteStat(favoriteStat - 1);
    }
    
    const favoriteButton = () => {
        if(isFavorited){
            return (
                <>
                    <button onClick={unfavorite}>Unfavorite</button>
                    <p>{favoriteStat}</p>
                </>
            )
        } else {
            return (
                <>
                    <button onClick={favorite}>Favorite</button>
                    <p>{favoriteStat}</p>
                </>
            )
        }
    }

    const tab = async e => {
        e.preventDefault();
        await WitterApi.tab(id, token);
        setIsTabbed(true);
        setTabStat(tabStat + 1);
    }

    const untab = async e => {
        e.preventDefault();
        await WitterApi.untab(id, token)
        setIsTabbed(false);
        setTabStat(tabStat - 1);
    }

    const tabButton = () => {
        if(isTabbed){
            return (
                <>
                   <button onClick={untab}>Untab</button>
                   <p>{tabStat}</p>
                </>
            )
        } else {
            return (
                <>
                   <button onClick={tab}>Tab</button>
                   <p>{tabStat}</p>
                </>
            )
        }
    }

    const editButton = () => {
        if(author === user.handle){
            return (
                <button>
                    <Link to={`/weets/${id}/edit`}>Edit Weet</Link>
                </button>
            )
        }
    }

    if(setting = 'group'){
        return (
            <Link to={`/weets/${id}`}>
                <div className='general-weet-container'>
                   <div className='author-date-time-container'>
                      <Link to={`/profile/${author}`}>{userInfo.username}</Link>
                      <Link to={`/profile/${author}`}>{author}</Link>
                      <p>{date} {time}</p>
                   </div>
                   <div className='weet-container'>
                      <p>{weet}</p>
                      {editButton()}
                   </div>
                   <div className='buttons-container'>
                      {reweetButton()}
                      {favoriteButton()}
                      {tabButton()}
                   </div>
                </div>
            </Link>
        )
    }
    else if(setting = 'single'){
        return (
            <div className='general-weet-container'>
                <div className='author-date-time-container'>
                    <Link to={`/profile/${author}`}>{userInfo.username}</Link>
                    <Link to={`/profile/${author}`}>{author}</Link>
                    <p>{date} {time}</p>
                </div>
                <div className='weet-container'>
                    <p>{weet}</p>
                    {editButton()}
                </div>
                <div className='buttons-container'>
                    {reweetButton()}
                    {favoriteButton()}
                    {tabButton()}
                </div>
            </div>
        )
    }  
}

export default WeetCard;