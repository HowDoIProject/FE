import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MomsPost = ({ showMyPosts, handleShowMyPost }) => {
    const [cookies] = useCookies(['accessToken']);
    const [postdata, setPostData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://howdoiapp.shop/api/mypage', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     access: cookies.accessToken,
    //                 },
    //             });

    //             const { mypage } = response.data;

    //             if (mypage.length === 0) {
    //                 console.log('No posts found.');
    //             } else {
    //                 console.log('My Posts:', mypage);
    //                 setPostData(mypage);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     handleShowMyPost();
    // }, [cookies.accessToken]);

    return (
        <button
            onClick={handleShowMyPost}
            className={`px-4 py-2 square-md ${
                showMyPosts ? 'bg-white-500 text-black border-b-2 border-black' : 'bg-white-200 text-black-800'
            }`}
        >
            내 작성글
        </button>
    );
};

export default MomsPost;
