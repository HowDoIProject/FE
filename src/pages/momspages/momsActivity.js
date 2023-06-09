import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import parent from '../../assets/icon/parent.svg';
import question from '../../assets/icon/question.svg';
import { useCookies } from 'react-cookie';
import MyPostButton from './MomsPost';
import MyChosenButton from './MomsChosen';
import FilterButton from './FilterButton';
import PostListCard from '../../components/PostListCard';
import MomsComment from '../../components/MomsComment';
import MomsPostEditDelteWindow from './MomsPostEditDelete';

export default function MomsActivity() {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState();
    const [filteredChosenComments, setFilteredChosenComments] = useState([]);
    const [cookies] = useCookies(['accessToken']);
    const [filter, setFilter] = useState('today');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [mycomments, setMyComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [post_id, setPostId] = useState();
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState();
    const [comment_id, setCommentId] = useState();
    const [mychosen, setMyChosen] = useState([]);
    const [showMyPosts, setShowMyPosts] = useState(false);
    const [showMyComment, setShowMyComment] = useState(false);
    const [showMyChosenComments, setShowMyChosenComments] = useState(false);

    const handleShowMyPost = async () => {
        setShowMyPosts(true);
        setShowMyComment(false);
        setShowMyChosenComments(false);

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
                setPosts(mypage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleShowMyPost();
    }, [cookies.accessToken]);

    const handleShowMyComment = async () => {
        setShowMyPosts(false);
        setShowMyComment(true);
        setShowMyChosenComments(false);

        try {
            const response = await axios.get('https://howdoiapp.shop/api/mycomment', {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            const { mycomment } = response.data;

            if (Array.isArray(mycomment)) {
                if (mycomment.length > 0) {
                    console.log('My Comments:', mycomment);
                    setMyComments(mycomment);
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
        handleShowMyComment();
    }, [cookies.accessToken]);

    const handleShowMyChosen = async () => {
        setShowMyPosts(false);
        setShowMyComment(false);
        setShowMyChosenComments(true);

        try {
            const response = await axios.get('https://howdoiapp.shop/api/mychosencomment', {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            const { data } = response;

            if (Array.isArray(data.mychosencomment) && data.mychosencomment.length > 0) {
                console.log('My chosencomment:', data.mychosencomment);
                setMyChosen(data.mychosencomment);
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

    const handleFilterByPeriod = period => {
        const currentDate = new Date();
        let filteredData = [];

        if (period === 'today') {
            filteredData = posts.filter(
                post => new Date(post.created_at).toDateString() === currentDate.toDateString()
            );
        } else if (period === '1month') {
            const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
            filteredData = posts.filter(
                post => new Date(post.created_at) >= oneMonthAgo && new Date(post.created_at) <= currentDate
            );
        } else if (period === '3months') {
            const threeMonthsAgo = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
            filteredData = posts.filter(
                post => new Date(post.created_at) >= threeMonthsAgo && new Date(post.created_at) <= currentDate
            );
        } else if (period === '6months') {
            const sixMonthsAgo = new Date(currentDate.getTime() - 180 * 24 * 60 * 60 * 1000);
            filteredData = posts.filter(
                post => new Date(post.created_at) >= sixMonthsAgo && new Date(post.created_at) <= currentDate
            );
        }

        const filteredComments = mycomments.filter(comment => {
            const createdAtDate = new Date(comment.created_at);
            const diffInMonths =
                (currentDate.getFullYear() - createdAtDate.getFullYear()) * 12 +
                (currentDate.getMonth() - createdAtDate.getMonth());
            return diffInMonths <= 6;
        });

        const filteredChosenComments = mychosen.filter(chosencomment => {
            const createdAtDate = new Date(chosencomment.updated_at);
            const diffInMonths =
                (currentDate.getFullYear() - createdAtDate.getFullYear()) * 12 +
                (currentDate.getMonth() - createdAtDate.getMonth());
            return diffInMonths <= 6;
        });

        setFilteredPosts(filteredData);
        setFilteredComments(filteredComments);
        setFilteredChosenComments(filteredChosenComments);
        setFilter(period);

        if (showMyPosts) {
            setFilteredPosts(filteredData);
        } else if (showMyComment) {
            setFilteredComments(filteredComments);
        } else if (showMyChosenComments) {
            setFilteredChosenComments(filteredChosenComments);
        }
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
        <>
            <div className="bg-white-100 p-4 rounded-lg mb-4 mt-8">
                <div className="flex flex-col items-start p-10">
                    <div className="ml-60 w-16 h-16 bg-white rounded-md shadow-md">
                        <div className="text-2xl font-bold">
                            <img src={parent} alt="Dog Icon" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <h1>
                            {nickname && nickname.nickname}
                            {user_type && ` ${user_type.user_type}`}님
                        </h1>
                    </div>

                    <div className="mt-4 w-full">
                        <div className="graph">
                            <div className="graph-bar bg-blue-500" style={{ width: '60%' }}>
                                <div className="graph-label">내가 쓴 답 </div>
                            </div>
                            <div className="graph-bar bg-green-500" style={{ width: '30%' }}>
                                <div className="graph-label">도웁 됬어요 </div>
                            </div>
                            <div className="graph-bar bg-green-800" style={{ width: '70%' }}>
                                <div className="graph-label">게시글</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <img src={question} alt="Question Icon" className="mr-2" />
                <h1 className="m-4 mt-3">레벨제도란 무엇인가요?</h1>
            </div>
            {/* 기간별 필터 버튼 */}
            <div className="flex justify-left mb-7">
                <div className="flex space-x-5">
                    <FilterButton
                        label="오늘"
                        selected={filter === 'today'}
                        onClick={() => handleFilterByPeriod('today')}
                    />

                    <FilterButton
                        label="1 개월"
                        selected={filter === '1month'}
                        onClick={() => handleFilterByPeriod('1month')}
                    />

                    <FilterButton
                        label="3 개월"
                        selected={filter === '3months'}
                        onClick={() => handleFilterByPeriod('3months')}
                    />

                    <FilterButton
                        label="6개월"
                        selected={filter === '6months'}
                        onClick={() => handleFilterByPeriod('6months')}
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold text-center mb-10"></h3>
                <div className="flex justify-center space-x-10 mb-10">
                    <MyPostButton showMyPosts={showMyPosts} handleShowMyPost={handleShowMyPost} />
                    {/* <MyCommentButton showMyComments={showMyComment} handleShowMyComment={handleShowMyComment} /> */}
                    <button
                        onClick={handleShowMyComment}
                        className={`px-4 py-2 square-md ${
                            showMyComment
                                ? 'bg-white-500 text-black border-b-2 border-black'
                                : 'bg-white-200 text-black-800'
                        }`}
                    >
                        나의 댓글
                    </button>
                    <MyChosenButton
                        showMyChosenComments={showMyChosenComments}
                        handleShowMyChosen={handleShowMyChosen}
                    />
                </div>

                {showMyPosts && (
                    <div>
                        <h4 className="bg-gray-100 text-lg font-bold mb-2 text-center"></h4>
                        <h4 className="text-lg font-bold">나의 게시글</h4>
                        {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredPosts.map(post => (
                                    <div key={post.post_id} className="bg-white p-4 rounded shadow">
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
                                                            <MomsPostEditDelteWindow
                                                                post_id={post.post_id}
                                                                setFilteredPosts={setFilteredPosts}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>오늘의 게시글이 없습니다.</p>
                        )}
                    </div>
                )}

                {showMyComment && (
                    <div>
                        <h4 className="text-lg font-bold">나의 댓글</h4>
                        {Array.isArray(filteredComments) && filteredComments.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredComments.map(mycomment => (
                                    <div key={mycomment.comment_id} className="bg-white p-4 rounded shadow">
                                        <div className="comment-box bg-gray-100 rounded-lg p-4 transition-colors duration-300 hover:bg-gray-100">
                                            <MomsComment
                                                post={post}
                                                comment={mycomment.comment}
                                                comment_id={mycomment.comment_id}
                                                user_id={mycomment.user_id}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>댓글을 찾을 수 없습니다. </p>
                        )}
                    </div>
                )}

                {showMyChosenComments && (
                    <div>
                        <h4 className="text-lg font-bold">나 채택 & Top 5 </h4>
                        {Array.isArray(filteredChosenComments) && filteredChosenComments.length > 0 ? (
                            filteredChosenComments.map(chosencomment => (
                                <div key={chosencomment.comment_id} className="border p-4 rounded-lg my-4">
                                    <p>Comment: {chosencomment.comment}</p>
                                    <p>Category: {chosencomment.categoryy}</p>
                                    <p>Chosen At: {new Date(chosencomment.updated_at).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>채택된 글을 찾을 수 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
