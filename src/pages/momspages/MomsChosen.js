import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MomsChosen = ({ showMyChosenComments, handleShowMyChosen }) => {
    const [myChosen, setMyChosen] = useState([]);
    const [cookies] = useCookies(['accessToken']);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://howdoiapp.shop/api/mychosencomment', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     access: cookies.accessToken,
    //                 },
    //             });

    //             const { data } = response;
    //             setMyChosen(data);
    //         } catch (error) {
    //             console.error('Error fetching chosen comments:', error);
    //         }
    //     };

    //     handleShowMyChosen();
    // }, [cookies.accessToken]);

    return (
        <button
            onClick={handleShowMyChosen}
            className={`px-4 py-2 square-md ${
                showMyChosenComments ? 'bg-white-500 text-black border-b-2 border-black' : 'bg-white-200 text-black-800'
            }`}
        >
            채택 & Top 5
        </button>
    );
};

export default MomsChosen;
