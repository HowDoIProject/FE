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
    const [showMyHistory, setShowMyHistory] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken;
    const [selectedPostId, setSelectedPostId] = useState();
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
    });

    const handleUpdate = async (post_id, updatedData) => {
        try {
            const response = await axios.put(`https://howdoiapp.shop/api/mypage/${post_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            if (response.status === 201) {
                console.log('게시글이 수정되었습니다');
            } else {
                console.error('게시물 수정에 실패했습니다');
            }
        } catch (error) {
            console.error('게시물 수정 중 오류가 발생했습니다:', error);
        }
    };

    const handleEditPost = (post_id, updatedTitle, updatedContent, updatedImage) => {
        const updatedData = {
            title: updatedTitle,
            content: updatedContent,
            image: updatedImage,
        };

        handleUpdate(post_id, updatedData);
    };

    const handleDelete = post_id => {
        axios
            .delete(`https://howdoiapp.shop/api/mypage/${post_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            })
            .then(response => {
                console.log('Post successfully deleted');
            })
            .catch(error => {
                console.error('Failed to delete post:', error);
            });
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
        setShowMyHistory(false);

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
        setShowMyHistory(false);
    };

    const handleShowMyHistory = () => {
        setShowMyPost(false);
        setShowMyComment(false);
        setShowMyHistory(true);
    };

    useEffect(() => {
        if (selectedPostId !== undefined) {
            const selectedPost = filteredPosts.find(post => post.post_id === selectedPostId);
            if (selectedPost) {
                setPost({
                    ...selectedPost,
                });
            }
        }
    }, [selectedPostId, filteredPosts]);

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
                        onClick={handleShowMyHistory}
                        className={`px-4 py-2 rounded-md ${
                            showMyHistory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
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
                            {post.post_id === selectedPostId ? (
                                <div>
                                    <input
                                        type="text"
                                        value={post.title || ''}
                                        onChange={e => setPost(prevPost => ({ ...prevPost, title: e.target.value }))}
                                        placeholder="제목"
                                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                                    />
                                    <textarea
                                        value={post.content || ''}
                                        onChange={e => setPost(prevPost => ({ ...prevPost, content: e.target.value }))}
                                        placeholder="내용"
                                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={post.image || ''}
                                        onChange={e => setPost(prevPost => ({ ...prevPost, image: e.target.value }))}
                                        placeholder="Language URL"
                                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                                    />

                                    <button
                                        onClick={() =>
                                            handleEditPost(post.post_id, post.title, post.content, post.image)
                                        }
                                        className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
                                    >
                                        저장
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                    <p className="mb-2">{post.content}</p>
                                    <p>By: {post.nickname}</p>
                                    <p>Likes: {post.like}</p>
                                    <p>Scraps: {post.scrap}</p>
                                    <p>Created At: {new Date(post.created_at).toLocaleDateString()}</p>
                                    <p>Updated At: {new Date(post.updated_at).toLocaleDateString()}</p>
                                    <button
                                        onClick={() => setSelectedPostId(post.post_id)}
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
                                    >
                                        수정하기
                                    </button>
                                    <div>
                                        <button
                                            onClick={() => handleDelete(post.post_id)}
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
                                        >
                                            삭제하기
                                        </button>
                                    </div>
                                </div>
                            )}
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
            {showMyHistory && (
                <div>
                    <h4 className="text-lg font-bold">My Adoption History</h4>
                    {/* Render your adoption history */}
                </div>
            )}
        </div>
    );
};

export default DoggysActivity;
