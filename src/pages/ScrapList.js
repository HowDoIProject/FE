import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScrapLists = () => {
    const [scraps, setScraps] = useState([]);

    useEffect(() => {
        const fetchScraps = async () => {
            try {
                const response = await axios.get('/api/scrape');
                setScraps(response.data);
            } catch (error) {
                console.error('Error fetching scraps:', error);
            }
        };

        fetchScraps();
    }, []);

    const handleDelete = async scrapId => {
        try {
            await axios.delete(`/api/scrape/${scrapId}`);
            setScraps(scraps.filter(scrap => scrap.id !== scrapId));
        } catch (error) {
            console.error('Error deleting scrap:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Scraps</h1>
            <ul className="space-y-4">
                {scraps.map(scrap => (
                    <li key={scrap.id}>
                        <div className="bg-gray-200 p-4 rounded">
                            <h2 className="text-lg font-bold">{scrap.title}</h2>
                            <p className="text-gray-600">{scrap.content}</p>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                                onClick={() => handleDelete(scrap.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScrapLists;
