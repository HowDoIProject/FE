import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import PostListCard from '../../components/PostListCard';

const DoggysActivity = () => {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};
    const [postData, setPostData] = useState([]);
    const [mycomments, setMyComments] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showMyPost, setShowMyPost] = useState(false);
    const [showMyComments, setShowMyComments] = useState(false);
    const [showMyHistory, setShowMyHistory] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken;
    const [selectedPostId, setSelectedPostId] = useState();
    const [selectedButton, setSelectedButton] = useState(null);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
    });

    const handleButtonClick = buttonName => {
        setSelectedButton(buttonName === selectedButton ? null : buttonName);
    };

    // 게시물 수정 요청 처리
    const handleUpdate = async (post_id, updatedData) => {
        try {
            const response = await axios.put(`https://howdoiapp.shop/api/mypage/${post_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log(response);
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

    // 게시물 삭제 요청 처리
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

    // 기간별 필터링 처리
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

        const filteredComments = comments.filter(comment => {
            const createdAtDate = new Date(comment.created_at);
            const diffInMonths =
                (currentDate.getFullYear() - createdAtDate.getFullYear()) * 12 +
                (currentDate.getMonth() - createdAtDate.getMonth());
            return diffInMonths <= 6; // Change the condition as per your requirement (e.g., 1 month, 3 months, etc.)
        });

        setFilteredPosts(filteredData);
        setComments(filteredComments);
        setSelectedOption(period);
    };

    // 내 게시물 보기 처리
    const handleShowMyPost = async () => {
        setShowMyPost(true);
        setShowMyComments(false);
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

    // 내 댓글 보기 처리
    const handleShowMyComment = async () => {
        setShowMyPost(false);
        setShowMyComments(true);
        setShowMyHistory(false);

        try {
            const response = await axios.get('https://howdoiapp.shop/api/mycomment', {
                headers: {
                    'Content-Type': 'application/json',
                    access: cookies.accessToken,
                },
            });

            const { data } = response;

            if (Array.isArray(data)) {
                if (data.length > 0) {
                    console.log('My Comments:', data);
                    setComments(data);
                } else {
                    console.log('No comments found.');
                }
            } else {
                console.log('Invalid data format for comments.');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        const handleShowMyComment = async () => {
            setShowMyPost(false);
            setShowMyComments(true);
            setShowMyHistory(false);

            try {
                const response = await axios.get('https://howdoiapp.shop/api/mycomment', {
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

        handleShowMyComment();
    }, [cookies.accessToken]);

    const handleShowMyHistory = () => {
        setShowMyPost(false);
        setShowMyComments(false);
        setShowMyHistory(true);
    };

    useEffect(() => {
        if (selectedPostId !== undefined) {
            const selectedPost = filteredPosts.find(post => post.post_id === selectedPostId);
            if (selectedPost) {
                setPost(selectedPost);
            }
        }
    }, [selectedPostId, filteredPosts]);

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">내 활동 보기</h2>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2"></h3>
            </div>
            <div className="mb-8">
                <h3 className="text-lg font-bold text-center mb-10"></h3>
                <div className="flex justify-center space-x-8 mb-10">
                    <button
                        onClick={handleShowMyPost}
                        className={`px-4 py-2 rounded-md ${
                            showMyPost
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        내 작성글
                    </button>

                    <button
                        onClick={handleShowMyComment}
                        className={`px-4 py-2 rounded-md ${
                            showMyComments
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        내 댓글
                    </button>

                    <button
                        onClick={handleShowMyHistory}
                        className={`px-4 py-2 rounded-md ${
                            showMyHistory
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        내 채택
                    </button>
                </div>

                <div className="flex justify-center mb-7">
                    <div className="flex space-x-5">
                        <button
                            onClick={() => handleFilterByPeriod('today')}
                            className={`w-200 h-8 rounded-md flex items-center justify-center text-sm ${
                                selectedOption === 'today' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-white-800'
                            }`}
                        >
                            오늘
                        </button>

                        <button
                            onClick={() => handleFilterByPeriod('1month')}
                            className={`w-200 h-8 rounded-md flex items-center justify-center text-sm ${
                                selectedOption === '1month' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-white-800'
                            }`}
                        >
                            1 개월
                        </button>

                        <button
                            onClick={() => handleFilterByPeriod('3months')}
                            className={`w-200 h-8 rounded-md flex items-center justify-center text-sm ${
                                selectedOption === '3months' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-white-800'
                            }`}
                        >
                            3 개월
                        </button>

                        <button
                            onClick={() => handleFilterByPeriod('6months')}
                            className={`w-200 h-8 rounded-md flex items-center justify-center text-sm ${
                                selectedOption === '6months' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-white-800'
                            }`}
                        >
                            6 개월
                        </button>
                    </div>
                </div>
            </div>
            {showMyPost && (
                <div>
                    <h4 className="bg-gray-100 text-lg font-bold mb-2 text-center"></h4>
                    {filteredPosts.map(post => (
                        <div key={post.post_id} className="border p-4 rounded-lg mb-4 bg-gray-100">
                            {post.post_id === selectedPostId ? (
                                <div>
                                    <input
                                        type="text"
                                        value={post.title || ''}
                                        onChange={e => {
                                            const updatedTitle = e.target.value;
                                            setFilteredPosts(prevPosts =>
                                                prevPosts.map(prevPost =>
                                                    prevPost.post_id === post.post_id
                                                        ? { ...prevPost, title: updatedTitle }
                                                        : prevPost
                                                )
                                            );
                                        }}
                                        placeholder="제목"
                                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                                    />
                                    <textarea
                                        value={post.content || ''}
                                        onChange={e => {
                                            const updatedContent = e.target.value;
                                            setFilteredPosts(prevPosts =>
                                                prevPosts.map(prevPost =>
                                                    prevPost.post_id === post.post_id
                                                        ? { ...prevPost, content: updatedContent }
                                                        : prevPost
                                                )
                                            );
                                        }}
                                        placeholder="내용"
                                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={post.image || ''}
                                        onChange={e => {
                                            const updatedImage = e.target.value;
                                            setFilteredPosts(prevPosts =>
                                                prevPosts.map(prevPost =>
                                                    prevPost.post_id === post.post_id
                                                        ? { ...prevPost, image: updatedImage }
                                                        : prevPost
                                                )
                                            );
                                        }}
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
                                <div
                                    key={post.post_id}
                                    className="w-full h-[140px] my-4 cursor-pointer hover:scale-105 ease-in-out duration-300"
                                >
                                    <PostListCard post={post} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {showMyComments && (
                <div>
                    <h4 className="text-lg font-bold">My Comment</h4>
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.comment_id} className="border p-4 rounded-lg my-4">
                                <p>{comment.comment}</p>
                                <p>User ID: {comment.user_id}</p>
                                <p>Category: {comment.category}</p>
                                <p>Chosen: {comment.chosen === 1 ? 'Yes' : 'No'}</p>
                                <p>Created At: {new Date(comment.created_at).toLocaleDateString()}</p>
                                <p>Updated At: {new Date(comment.updated_at).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments found.</p>
                    )}
                </div>
            )}

            {/* 
         {showMyHistory && (
                // <div>
                //     <h4 className="text-lg font-bold">내 채택내역</h4>
                //      Render your adoption history
                // </div>
            )}  */}
        </div>
    );
};

export default DoggysActivity;
