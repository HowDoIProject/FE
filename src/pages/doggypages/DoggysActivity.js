import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

const DoggysActivity = () => {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};
    const [postData, setPostData] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showMyPost, setShowMyPost] = useState(false);
    const [showMyComment, setShowMyComment] = useState(false);
    const [showMyAdoptionHistory, setShowMyAdoptionHistory] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken;
    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        image: '',
    });
    // const [values, setValues] = useState({
    //     nickname: '',
    //     user_name: '',
    //     user_id: '',
    //     //     post_id: '',
    //     //     title: '',
    //     //     content: '',
    //     //     image: '',
    //     //     like: 0,
    //     //     scrap: 0,
    //     //     created_at: '',
    //     //     updated_at: '',
    // });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://howdoiapp.shop/api/mypage', {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${cookies.accessToken}`, // Access the accessToken from cookies
    //                 },
    //             });
    //             setPostData(response.data.mypage);
    //             setFilteredPosts(response.data.mypage);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [cookies.accessToken]);

    const handleEditPost = async (post_id, updatedData) => {
        try {
            const response = await axios.put(`https://howdoiapp.shop/api/mypage/${post_id}`, formValues, {
                headers: {
                    'Content-Type': 'application/json',
                    access: ` ${cookies.accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log('Post updated successfully');
                // Handle success, such as updating the UI or showing a success message
            } else {
                console.error('Post update failed');
                // Handle failure, such as showing an error message or taking appropriate action
            }
        } catch (error) {
            console.error('Error updating post:', error);
            // Handle error, such as showing an error message or taking appropriate action
        }
    };

    const handleFormSubmit = () => {
        handleEditPost(`$(post_id)`, formValues);
    };

    const handleFilterByPeriod = period => {
        const currentDate = new Date();
        let filteredData = [];

        if (period === 'today') {
            filteredData = postData.filter(
                post => new Date(post.created_at).toDateString() === currentDate.toDateString()
            );
        } else if (period === '1month') {
            const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
            filteredData = postData.filter(
                post => new Date(post.created_at) >= oneMonthAgo && new Date(post.created_at) <= currentDate
            );
        } else if (period === '3months') {
            const threeMonthsAgo = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
            filteredData = postData.filter(
                post => new Date(post.created_at) >= threeMonthsAgo && new Date(post.created_at) <= currentDate
            );
        } else if (period === '6months') {
            const sixMonthsAgo = new Date(currentDate.getTime() - 180 * 24 * 60 * 60 * 1000);
            filteredData = postData.filter(
                post => new Date(post.created_at) >= sixMonthsAgo && new Date(post.created_at) <= currentDate
            );
        }

        setFilteredPosts(filteredData);
        setSelectedOption(period);
    };

    const handleShowMyPost = async () => {
        setShowMyPost(true);
        setShowMyComment(false);
        setShowMyAdoptionHistory(false);

        try {
            const response = await axios.get('https://howdoiapp.shop/api/mypage', {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            const { mypage } = response.data;

            if (mypage.length === 0) {
                console.log('No posts found.');
                // Handle the case when no posts are found
                // For example, you can show a message to the user or update the state accordingly
            } else {
                console.log('My Posts:');
                mypage.forEach(item => {
                    const { post_id, nickname, title, content, image, like_num, scrap_num, created_at, updated_at } =
                        item;

                    console.log('Post ID:', post_id);
                    console.log('Nickname:', nickname);
                    console.log('Title:', title);
                    console.log('Content:', content);
                    console.log('Image:', image);
                    console.log('Likes:', like_num);
                    console.log('Scraps:', scrap_num);
                    console.log('Created At:', created_at);
                    console.log('Updated At:', updated_at);
                    console.log('---');
                });

                // Update the state with the retrieved posts
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

    const handleShowMyComment = () => {
        setShowMyPost(false);
        setShowMyComment(true);
        setShowMyAdoptionHistory(false);
    };

    const handleShowMyAdoptionHistory = () => {
        setShowMyPost(false);
        setShowMyComment(false);
        setShowMyAdoptionHistory(true);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Activity</h2>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Filter by Period</h3>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleFilterByPeriod('today')}
                        className={`px-4 py-2 rounded-md ${
                            selectedOption === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => handleFilterByPeriod('1month')}
                        className={`px-4 py-2 rounded-md ${
                            selectedOption === '1month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        1 Month
                    </button>
                    <button
                        onClick={() => handleFilterByPeriod('3months')}
                        className={`px-4 py-2 rounded-md ${
                            selectedOption === '3months' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        3 Months
                    </button>
                    <button
                        onClick={() => handleFilterByPeriod('6months')}
                        className={`px-4 py-2 rounded-md ${
                            selectedOption === '6months' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        6 Months
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Show</h3>
                <div className="flex space-x-4">
                    <button
                        onClick={handleShowMyPost}
                        className={`px-4 py-2 rounded-md ${
                            showMyPost ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        My Post
                    </button>
                    <button
                        onClick={handleShowMyComment}
                        className={`px-4 py-2 rounded-md ${
                            showMyComment ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        My Comment
                    </button>
                    <button
                        onClick={handleShowMyAdoptionHistory}
                        className={`px-4 py-2 rounded-md ${
                            showMyAdoptionHistory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        내 채택내역
                    </button>
                </div>
            </div>
            {showMyPost && (
                <div>
                    <h4 className="text-lg font-bold mb-2">My Posts</h4>
                    {filteredPosts.map(post => (
                        <div key={post.post_id} className="border p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                            <p className="mb-2">{post.content}</p>
                            <p>By: {post.nickname}</p>
                            <p>Likes: {post.like}</p>
                            <p>Scraps: {post.scrap}</p>
                            <p>Created At: {new Date(post.created_at).toLocaleDateString()}</p>
                            <p>Updated At: {new Date(post.updated_at).toLocaleDateString()}</p>
                            <button
                                onClick={() => handleEditPost(post.post_id)}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                수정하기
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {showMyComment && (
                <div>
                    <h4 className="text-lg font-bold">My Comments</h4>
                    {/* Render your comments */}
                </div>
            )}
            {showMyAdoptionHistory && (
                <div>
                    <h4 className="text-lg font-bold">My Adoption History</h4>
                    {/* Render your adoption history */}
                </div>
            )}
        </div>
    );
};

export default DoggysActivity;
