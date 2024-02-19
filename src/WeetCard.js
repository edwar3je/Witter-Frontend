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
                <div className='changeable-button-container'>
                    <button className='unreweet-button' onClick={unreweet}>
                        <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 512 512">
                            <path fill="#63E6BE" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                        </svg>
                    </button>
                    <p className='stat'>{reweetStat}</p>
                </div>
            )
        } else {
            return (
                <div className='changeable-button-container'>
                    <button className='reweet-button' onClick={reweet}>
                        <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 512 512">
                            <path fill="#7f7f7f" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                        </svg>
                    </button>
                    <p className='stat'>{reweetStat}</p>
                </div>
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
                <div className='changeable-button-container'>
                    <button className='unfavorite-button' onClick={unfavorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 576 512">
                            <path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                    </button>
                    <p className='stat'>{favoriteStat}</p>
                </div>
            )
        } else {
            return (
                <div className='changeable-button-container'>
                    <button className='favorite-button' onClick={favorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 576 512">
                            <path fill="#7f7f7f" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                        </svg>
                    </button>
                    <p className='stat'>{favoriteStat}</p>
                </div>
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
                <div className='changeable-button-container'>
                    <button className='untab-button' onClick={untab}>
                        <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 384 512">
                            <path fill="#ff8b47" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
                        </svg>
                    </button>
                    <p className='stat'>{tabStat}</p>
                </div>
            )
        } else {
            return (
                <div className='changeable-button-container'>
                    <button className='tab-button' onClick={tab}>
                        <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 384 512">
                            <path fill="#7f7f7f" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/>
                        </svg>
                    </button>
                    <p className='stat'>{tabStat}</p>
                </div>
            )
        }
    }

    const editButton = () => {
        if(author === user.handle){
            return (
                <Link className='weet-edit-link' to={`/weets/${id}/edit`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height='17' width='17' viewBox="0 0 512 512">
                        <path fill="#865bd9" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                    </svg>
                </Link>
            )
        }
    }

    if(setting === 'group'){
        return (
            <Link className='weet-link-container' to={`/weets/${id}`}>
                <div className='group-weet-main-container'>
                    <div className='group-weet-left-container'>
                        <div className='group-weet-profile-image-container'>
                            <img src={userInfo.profile_image}></img>
                        </div>
                    </div>
                    <div className='group-weet-right-container'>
                        <div className='group-weet-user-info-container'>
                            <div className='group-weet-info'>
                                <Link className='group-weet-username' to={`/profile/${author}`}>{userInfo.username}</Link>
                                <Link className='group-weet-handle' to={`/profile/${author}`}>{`@${author}`}</Link>
                                <p className='group-weet-filler'>•</p>
                                <p className='group-weet-time'>{time}</p>
                                <p className='group-weet-filler'>•</p>
                                <p className='group-weet-date'>{date}</p>
                            </div>
                            <div className='group-weet-edit-link-container'>
                                {editButton()}
                            </div>
                        </div>
                        <div className='group-weet-weet-container'>
                            <p>{weet}</p>
                        </div>
                        <div className='group-weet-buttons-container'>
                            {reweetButton()}
                            {favoriteButton()}
                            {tabButton()}
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
    else if(setting === 'single'){
        return (
            <div className='single-weet-main-container'>
                <div className='single-weet-user-info-container'>
                    <div className='single-weet-profile-image-container'>
                        <img src={userInfo.profile_image}></img>
                    </div>
                    <div className='single-weet-user-container'>
                        <Link className='single-weet-username' to={`/profile/${author}`}>{userInfo.username}</Link>
                        <Link className='single-weet-handle' to={`/profile/${author}`}>{`@${author}`}</Link>
                    </div>
                    <div className='single-weet-edit-link-container'>
                        {editButton()}
                    </div>
                </div>
                <div className='single-weet-weet-container'>
                    <p>{weet}</p>
                </div>
                <div className='single-weet-time-date-container'>
                    <p className='single-weet-time'>{time}</p>
                    <p className='single-weet-filler'>•</p>
                    <p className='single-weet-date'>{date}</p>
                </div>
                <div className='single-weet-buttons-container'>
                    {reweetButton()}
                    {favoriteButton()}
                    {tabButton()}
                </div>
            </div>
        )
    }  
}

export default WeetCard;