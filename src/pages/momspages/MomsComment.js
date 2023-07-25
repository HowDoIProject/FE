import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MyCommentButton = ({ showMyComment, handleShowMyComment }) => {
    const [comments, setComments] = useState([]);
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.howdoiapp.shop/api/mycomment', {
                    headers: {
                        'Content-Type': 'application/json',
                        access: cookies.accessToken,
                    },
                });

                const { data } = response;

                if (Array.isArray(data.mycomment) && data.mycomment.length > 0) {
                    console.log('My Comments:', data.mycomment);
                    setComments(data.mycomment);
                } else {
                    console.log('No comments found.');
                    setComments([]);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchData();
    }, [cookies.accessToken]);

    return (
        <button
            onClick={handleShowMyComment}
            className={`px-4 py-2 square-md ${
                showMyComment ? 'bg-white-500 text-black border-b-2 border-black' : 'bg-white-200 text-black-800'
            }`}
        >
            나의 댓글
        </button>
    );
};

export default MyCommentButton;
