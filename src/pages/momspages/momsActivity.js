import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import image2 from '../../assets/icon/mom_dog.svg';
import question from '../../assets/icon/question.svg';
import { useCookies } from 'react-cookie';
import MyPostButton from './MomsPost';
import MyChosenButton from './MomsChosen';
import MyCommentButton from './MomsComment';

export default function MomsActivity() {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('today');
    const [cookies] = useCookies(['accessToken']);
    const [mycomments, setMyComments] = useState([]);
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
        handleShowMyChosen();
    }, [cookies.accessToken]);

    return (
        <>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 mt-8">
                <div className="flex flex-col items-start p-10">
                    <div className="ml-60 w-16 h-16 bg-white rounded-md shadow-md">
                        <div>
                            <img src={image2} alt="Dog Icon" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <h1>Love it!</h1>
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
                <h1 className="m-0">레벨제도란 무엇인가요?</h1>
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
                        <h4 className="text-lg font-bold">My Posts</h4>
                        {Array.isArray(posts) && posts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {posts.map(post => (
                                    <div key={post.post_id} className="bg-white p-4 rounded shadow">
                                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                        <p className="mb-2">{post.content}</p>
                                        <p>By: {post.nickname}</p>
                                        <p>Likes: {post.like}</p>
                                        <p>Scraps: {post.scrap}</p>
                                        <p>Created At: {new Date(post.created_at).toLocaleDateString()}</p>
                                        <p>Updated At: {new Date(post.updated_at).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                )}

                {showMyComment && (
                    <div>
                        <h4 className="text-lg font-bold">My Comment</h4>
                        {Array.isArray(mycomments) && mycomments.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {mycomments.map(mycomment => (
                                    <div key={mycomment.comment_id} className="bg-white p-4 rounded shadow">
                                        <h3 className="border p-4 rounded-lg my-4">{mycomment.comment}</h3>
                                        <p className="mb-2">User ID: {mycomment.user_id}</p>
                                        <p>Category: {mycomment.category}</p>
                                        <p>Chosen: {mycomment.chosen === 1 ? 'Yes' : 'No'}</p>
                                        <p>Created At: {new Date(mycomment.created_at).toLocaleDateString()}</p>
                                        <p>Updated At: {new Date(mycomment.updated_at).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No comments found.</p>
                        )}
                    </div>
                )}

                {showMyChosenComments && (
                    <div>
                        <h4 className="text-lg font-bold">My Chosen Comments</h4>
                        {Array.isArray(mychosen) && mychosen.length > 0 ? (
                            mychosen.map(chosencomment => (
                                <div key={chosencomment.comment_id} className="border p-4 rounded-lg my-4">
                                    <p>Comment: {chosencomment.comment}</p>
                                    <p>Category: {chosencomment.category}</p>
                                    <p>Chosen At: {new Date(chosencomment.updated_at).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>채택한 데이터가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
