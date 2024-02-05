import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeetCard from './WeetCard';
import './Weet.css';

const Weet = ({ user, token, getWeet }) => {

    const initialState = '';
    const [individualWeet, setIndividualWeet] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            console.log('failed localStorage check');
            navigate('/');
        }
        const fetchWeet = async (id, token) => {
            const results = await getWeet(id, token);
            setIndividualWeet(results);
            setIsLoading(false);
        }
        fetchWeet(id, token).catch(console.error);
    }, [token])

    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(!individualWeet){
        navigate('/NotFound');
    } else {
        const { id, weet, author, date, time, stats, userInfo, checks } = individualWeet;
        return (
            <div>
                <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'single'} key={id} />
            </div>
        )
    }
};

export default Weet;