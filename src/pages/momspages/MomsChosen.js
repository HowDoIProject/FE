import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MomsChosen = ({ showMyChosenComments, handleShowMyChosen }) => {
    // Component state and cookies
    const [myChosen, setMyChosen] = useState([]);
    const [cookies] = useCookies(['accessToken']);

    // Fetch data from API when the component mounts or when `cookies.accessToken` changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.howdoiapp.shop/api/mychosencomment', {
                    headers: {
                        'Content-Type': 'application/json',
                        access: cookies.accessToken,
                    },
                });

                const { data } = response;
                if (Array.isArray(data.mychosencomment) && data.mychosencomment.length > 0) {
                    console.log('.mychosencomment:', data.mychosencomment);
                    setMyChosen(data.mychosencomment);
                } else {
                    console.log('No comments found.');
                    setMyChosen([]);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchData(); // Call the fetchData function
        handleShowMyChosen(); // Call the handleShowMyChosen function
    }, [cookies.accessToken]);

    // Render the component
    return (
        <button
            onClick={handleShowMyChosen}
            className={`px-4 py-2 square-md ${
                showMyChosenComments ? 'bg-white-500 text-black border-b-2 border-black' : 'bg-white-200 text-black-800'
            }`}
        >
            내 채택 & TOP내역
        </button>
    );
};

export default MomsChosen;
