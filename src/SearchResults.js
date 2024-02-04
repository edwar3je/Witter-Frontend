import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ user, token }) => {
    
    const initialState = '';
    const [isLoading, setIsLoading] = useState(true);

    const { search } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true)
        }
        fetchResults()
    });

    if(!localStorage.getItem('token')){
        return navigate('/');
    }

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <h1>You have reached the search results</h1>
    )
};

export default SearchResults;