import React, { createContext, useState, useContext } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Elon Musk');
    const [error, setError] = useState(null);

    const fetchResults = async (type) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${baseUrl}${type}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                    'x-rapidapi-key': 'b9a1dce4ccmsh750ae6fd20fcaaap1ad8fajsn135a21ffe1e2',
                },
            });
            const data = await response.json();
            if (type.includes('/news')) {
                setResults(data.entries)
            } else if (type.includes('/images')) {
                setResults(data.image_results)
            } else {
                setResults(data.results)
            }
        } catch (error) {
            setError(error);
        }

        setLoading(false);
    }

    return (
        <ResultContext.Provider value={{fetchResults, results, searchTerm, setSearchTerm, loading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);