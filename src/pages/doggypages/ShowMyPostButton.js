import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowMyPostButton = ({ cookies, setPostData, setFilteredPosts }) => {
    const [showMyPost, setShowMyPost] = useState(false);
    const handleShowMyPost = async () => {
        try {
            const response = await axios.get('https://api.howdoiapp.shop/api/mypage', {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            const { mypage } = response.data;

            if (mypage.length === 0) {
                console.log('No posts found.');
            } else {
                console.log('My Posts:', mypage);
                setPostData(mypage);
                setFilteredPosts(mypage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleShowMyPost();
    }, [cookies.accessToken]);

    return (
        <button
            onClick={handleShowMyPost}
            className={`px-4 py-2 square-md ${
                showMyPost ? 'bg-white-500 text-black border-b-2 border-black' : 'bg-white-200 text-black-800'
            }`}
        >
            내 작성글
        </button>
    );
};

export default ShowMyPostButton;
