import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import PostListCard from '../../components/PostListCard';
import EditDeleteSelectWindow from './EditDeleteSelection';
import FilterButton from './FilteredButton';
import ChosenListCard from '../../components/ChosenListCard';
import CommentEditDeleteSelectWindow from './CommentEditDelete';
import MyComment from '../../components/MyComment';

const DoggysActivity = () => {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};
    const [postData, setPostData] = useState([]);
    // const [mycomments, setMyComments] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showMyPost, setShowMyPost] = useState(false);
    const [showMyComments, setShowMyComments] = useState(false);
    const [ShowMyChosenComment, setShowMyChosenComment] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken;
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState();
    const [selectedButton, setSelectedButton] = useState(null);
    const [updatedData, setUpdatedData] = useState(null);
    const [mychosen, setMyChosen] = useState([]);
    const [comments, setComments] = useState([]);
    const [chosencomments, setChosenComments] = useState([]);
    const [post_id, setPostId] = useState();
    const [category, setCategory] = useState();
    const [comment_id, setCommentId] = useState();
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: '',
    });

    const handleButtonClick = buttonName => {
        setSelectedButton(buttonName === selectedButton ? null : buttonName);
    };

    const handleEdit = () => {
        // Handle edit action
        console.log('Edit option selected');
    };
    const handleDeleteComment = () => {
        // Handle edit action
        console.log('Edit option selected');
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

    // const handleEditPost = (post_id, updatedTitle, updatedContent, updatedImage) => {
    //     const updatedData = {
    //         title: updatedTitle,
    //         content: updatedContent,
    //         image: updatedImage,
    //     };

    //     handleUpdate(post_id, updatedData);
    // };

    // 게시물 삭제 요청 처리
    const handleDelete = postId => {
        axios
            .delete(`https://howdoiapp.shop/api/mypage/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            })
            .then(() => {
                console.log('Post successfully deleted');
                setFilteredPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
            })
            .catch(error => {
                console.error('Failed to delete post:', error);
            });
    };

    useEffect(() => {
        handleDelete();
    }, [cookies.accessToken]);

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
        //댓글 월별 보기
        const filteredComments = comments.filter(comment => {
            const createdAtDate = new Date(comment.created_at);
            const diffInMonths =
                (currentDate.getFullYear() - createdAtDate.getFullYear()) * 12 +
                (currentDate.getMonth() - createdAtDate.getMonth());
            return diffInMonths <= 6;
        });

        setFilteredPosts(filteredData);
        setComments(filteredComments);
        setChosenComments(filteredData);
        setSelectedOption(period);
    };

    // 내 게시물 보기 처리
    const handleShowMyPost = async () => {
        setShowMyPost(true);
        setShowMyComments(false);
        setShowMyChosenComment(false);

        try {
            const response = await axios.get('https://howdoiapp.shop/api/mypage', {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            const { mypage } = response.data;
            setFilteredPosts(Array.isArray(response.data) ? response.data : []);

            if (mypage.length === 0) {
                console.log('No posts found.');
            } else {
                console.log('My Posts:', mypage);
                setPostData(mypage);
                setFilteredPosts(Array.isArray(mypage) ? mypage : []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleShowMyPost();
        handleEdit();
    }, [cookies.accessToken]);

    // 내 댓글 보기 처리
    const handleShowMyComment = async () => {
        setShowMyPost(false);
        setShowMyComments(true);
        setShowMyChosenComment(false);

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

    useEffect(() => {
        handleShowMyComment();
    }, [cookies.accessToken]);
    const handleEditComment = async (postId, commentId, updatedComment) => {
        const updatedData = {
            comment: updatedComment,
            image: '',
        };

        try {
            const response = await axios.put(
                `https://howdoiapp.shop/api/post/${postId}/comment/${commentId}`,
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        access: `${cookies.accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the comment data in the state
                setFilteredComments(prevComments => {
                    return prevComments.map(prevComment => {
                        if (prevComment.comment_id === commentId) {
                            return { ...prevComment, comment: updatedComment };
                        }
                        return prevComment;
                    });
                });
            } else {
                console.error('Failed to edit the comment. Response:', response);
            }
        } catch (error) {
            console.error('An error occurred while updating the comment:', error);
        }
    };

    const handleShowMyChosen = async () => {
        setShowMyPost(false);
        setShowMyComments(false);
        setShowMyChosenComment(true);

        try {
            const response = await axios.get('https://howdoiapp.shop/api/chosencomment', {
                headers: {
                    'Content-Type': 'application/json',
                    access: cookies.accessToken,
                },
            });

            const { data } = response;

            if (Array.isArray(data.chosencomment) && data.chosencomment.length > 0) {
                console.log('My chosencomment:', data.chosencomment);
                setMyChosen(data.chosencomment);
            } else {
                console.log('No adopted articles found.');
                setMyChosen([]);
            }
        } catch (error) {
            console.error('Error fetching adopted articles:', error);
        }
    };

    useEffect(() => {
        handleShowMyChosen();
    }, [cookies.accessToken]);

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
                        className={`px-4 py-2 square-md ${
                            showMyPost
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        내 작성글
                    </button>

                    <button
                        onClick={handleShowMyComment}
                        className={`px-4 py-2 square-md ${
                            showMyComments
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        내 댓글
                    </button>
                    <button
                        onClick={handleShowMyChosen}
                        className={`px-4 py-2 square-md ${
                            ShowMyChosenComment
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        내 채택
                    </button>
                </div>
                {/* 기간 월별 */}
                <div className="flex justify-left mb-7">
                    <div className="flex space-x-5">
                        <FilterButton
                            label="오늘"
                            selected={selectedOption === 'today'}
                            onClick={() => handleFilterByPeriod('today')}
                        />
                        <FilterButton
                            label="1 개월"
                            selected={selectedOption === '1month'}
                            onClick={() => handleFilterByPeriod('1month')}
                        />
                        <FilterButton
                            label="3 개월"
                            selected={selectedOption === '3months'}
                            onClick={() => handleFilterByPeriod('3months')}
                        />
                        <FilterButton
                            label="6 개월"
                            selected={selectedOption === '6months'}
                            onClick={() => handleFilterByPeriod('6months')}
                        />
                    </div>
                </div>
            </div>
            {/* //내가 쓴 글 수정하는 란 */}
            <div>
                {/* 내 작성글 */}
                {showMyPost && (
                    <div>
                        <h4 className="bg-gray-100 text-lg font-bold mb-2 text-center"></h4>
                        <h4 className="text-lg font-bold">내 작성글</h4>
                        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <div key={post.post_id} className="rounded-lg mb-4 bg-white-100">
                                    {post.post_id === selectedPostId ? (
                                        <div></div>
                                    ) : (
                                        <div className="relative">
                                            <div className="w-full h-[200px] my-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                                                <div className="relative">
                                                    <PostListCard
                                                        post={post}
                                                        post_id={post_id}
                                                        setFilteredPosts={setFilteredPosts}
                                                    />
                                                    <div className="absolute top-0 right-0">
                                                        <EditDeleteSelectWindow
                                                            post_id={post.post_id}
                                                            setFilteredPosts={setFilteredPosts}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>오늘의 게시물이 없습니다.</p>
                        )}
                    </div>
                )}

                {/* 내 댓글 보기 */}
                {showMyComments && (
                    <div>
                        <h4 className="text-lg font-bold">내 댓글</h4>
                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.comment_id} className="rounded-lg mb-4 bg-white-100">
                                    {comment.comment_id === selectedCommentId ? (
                                        <div></div>
                                    ) : (
                                        <div className="relative">
                                            <div className="w-full h-[200px] my-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                                                <div className="relative">
                                                    <MyComment
                                                        comments={comment.comment}
                                                        post={{ category, post }}
                                                        post_id={post_id}
                                                        setFilteredPosts={setFilteredPosts}
                                                        setFilteredComments={setFilteredComments}
                                                        comment={comment}
                                                        comment_id={comment_id}
                                                    />

                                                    <div className="absolute top-0 right-0">
                                                        {/* <CommentEditDeleteSelectWindow
                                                            post_id={post.post_id}
                                                            comment_id={comment.comment_id}
                                                            setFilteredComments={setFilteredComments}
                                                            comment={comment}
                                                            handleEditComment={() =>
                                                                handleEditComment(post_id, comment_id, cookies)
                                                            }
                                                            handleDeleteComment={() =>
                                                                handleDeleteComment(post_id, comment_id, cookies)
                                                            }
                                                        /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No comments found.</p>
                        )}
                    </div>
                )}

                {ShowMyChosenComment && (
                    <div>
                        <h4 className="text-lg font-bold">내 채택</h4>
                        {Array.isArray(mychosen) && mychosen.length > 0 ? (
                            mychosen.map(chosencomment => (
                                <div key={chosencomment.comment_id} className="border p-4 rounded-lg my-4">
                                    <ChosenListCard chosencomment={chosencomment} />
                                    {/* <p>Comment: {chosencomment.comment}</p>
                      <p>글제목: {chosencomment.category}</p> */}
                                    {/* <p>Chosen At: {new Date(chosencomment.updated_at).toLocaleDateString()}</p> */}
                                </div>
                            ))
                        ) : (
                            <p>채택한 데이터가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoggysActivity;
