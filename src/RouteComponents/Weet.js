import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeetCard from '../CardComponents/WeetCard';
import './styles/Weet.css';

/** This component renders a div that contains a single WeetCard component instance in the 'single' display state. Upon initial render, the component
 *  checks if the user is currently signed in by checking to see if a token is stored in localStorage (if not, the user is redirected to the home page).
 *  Afterwards, an async function is called to fetch the weet based on the id provided in the url. If the async function catches any errors (weet does 
 *  not exist), the user is redirected to the 'Not Found' page. Otherwise, the information is saved to the 'individualWeet' state, and the keys from
 *  'individualWeet' are placed inside the WeetCard prop to generate the weet.
 * 
 *  Unlike the 'group' display state of a WeetCard component instance, the 'single' display state has a few formatting changes, with the most notable
 *  difference being that the main WeetCard div does not function as a link leading to the specifice weet.
 * 
 */

const Weet = ({ user, token, getWeet }) => {

    const initialState = '';
    const [individualWeet, setIndividualWeet] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/');
        }
        const fetchWeet = async (id, token) => {
            const results = await getWeet(id, token);
            setIndividualWeet(results);
            setIsLoading(false);
        }
        fetchWeet(id, token).catch((error) => {
            console.error(error);
            navigate('/NotFound');
        });
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
            <div className='single-weet-page-container'>
                <WeetCard id={id} weet={weet} author={author} date={date} time={time} stats={stats} userInfo={userInfo} checks={checks} user={user} token={token} setting={'single'} key={id} />
            </div>
        )
    }
};

export default Weet;