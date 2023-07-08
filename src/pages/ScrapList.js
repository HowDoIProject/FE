import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ScrapScreen = () => {
    const [scrapList, setScrapList] = useState([]);
    const [cookies] = useCookies(['accessToken']);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState();

    useEffect(() => {
        const fetchScrapList = async () => {
            try {
                const response = await axios.get(`https://howdoiapp.shop/api/scrap/${filter}/${category}/${page}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        access: `${cookies.accessToken}`,
                    },
                });

                const { scrap } = response.data;

                if (Array.isArray(scrap) && scrap.length === 0) {
                    console.log('My Scrap', scrap);
                    setScrapList(scrap);
                } else {
                    console.log('Scrap List:', scrap);
                    setScrapList([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchScrapList();
    }, [cookies.accessToken, category, filter, page]);

    return (
        <>
            <div className="p-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {scrapList.map(scrap => (
                        <div className="bg-white rounded shadow p-4" key={scrap.post_id}>
                            <h3 className="text-xl font-semibold mb-2">{scrap.title}</h3>
                            <p>{scrap.content}</p>
                            <p>By: {scrap.nickname}</p>
                            <img src={scrap.image} alt={scrap.title} />
                            <p>Likes: {scrap.like}</p>
                            <p>Scraps: {scrap.scrap}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ScrapScreen;
