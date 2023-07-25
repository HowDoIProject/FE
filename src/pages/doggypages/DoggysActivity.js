import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import PostListCard from '../../components/PostListCard';
import EditDeleteSelectWindow from './EditDeleteSelection';
import FilterButton from './FilteredButton';
import ChosenListCard from '../../components/ChosenListCard';
import MyComment from '../../components/MyComment';
import Footer from '../../components/Footer';
import noresult from '../../assets/icon/noresult.svg';

const DoggysActivity = () => {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};
    const [postData, setPostData] = useState([]);
    const [mycomments, setMyComments] = useState([]);
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
            const response = await axios.get('https://api.howdoiapp.shop/api/mypage', {
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
    }, [cookies.accessToken]);

    // 내 댓글 보기 처리
    const handleShowMyComment = async () => {
        setShowMyPost(false);
        setShowMyComments(true);
        setShowMyChosenComment(false);

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

    const handleShowMyChosen = async () => {
        setShowMyPost(false);
        setShowMyComments(false);
        setShowMyChosenComment(true);

        try {
            const response = await axios.get('https://api.howdoiapp.shop/api/chosencomment', {
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
        if (selectedPostId !== undefined) {
            const selectedPost = filteredPosts.find(post => post.post_id === selectedPostId);
            if (selectedPost) {
                setPost(selectedPost);
            }
        }
    }, [selectedPostId, filteredPosts]);

    return (
        <>
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <div className="mx-auto font-['Pretendard-Bold']">내 활동 보기</div>
                </div>
            </div>
            <div className="mx-auto pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen relative">
                <div className="mx-5">
                    <div className="flex w-full mt-4 justify-evenly mb-8">
                        <button
                            onClick={handleShowMyPost}
                            className={`px-4 py-2 w-1/3 ${
                                showMyPost ? 'border-b-2 text-[14px] border-main' : 'text-gray_02 text-[14px]'
                            }`}
                        >
                            내 작성글
                        </button>
                        <button
                            onClick={handleShowMyComment}
                            className={`px-4 py-2 w-1/3 ${
                                showMyComments ? 'border-b-2 text-[14px] border-main' : 'text-gray_02 text-[14px]'
                            }`}
                        >
                            내 답변
                        </button>
                        <button
                            onClick={handleShowMyChosen}
                            className={`px-4 py-2 w-1/3 ${
                                ShowMyChosenComment ? 'border-b-2 text-[14px] border-main' : 'text-gray_02 text-[14px]'
                            }`}
                        >
                            내 채택내역
                        </button>
                    </div>
                    {/* 기간 월별 */}
                    {/* <div className="flex gap-3 mt-8 mb-5">
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
                    </div> */}
                    {/* 내 작성글 */}
                    {showMyPost && (
                        <div>
                            {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                                filteredPosts.map(post => (
                                    <div key={post.post_id}>
                                        {post.post_id === selectedPostId ? (
                                            <div></div>
                                        ) : (
                                            <div className="relative">
                                                <div className="w-full my-4 cursor-pointer">
                                                    <div className="relative">
                                                        <PostListCard
                                                            post={post}
                                                            post_id={post_id}
                                                            setFilteredPosts={setFilteredPosts}
                                                        />
                                                        <div className="absolute top-0 right-0">
                                                            <EditDeleteSelectWindow
                                                                post={post}
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
                                <div className="mt-40 flex flex-col items-center justify-center gap-8">
                                    <img className="w-20" src={noresult} alt="" />
                                    <div className="font-['Pretendard-Bold'] text-gray_01 text-[18px]">
                                        작성한 글이 없습니다
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {/* 내 댓글 보기 */}
                    {showMyComments && (
                        <div>
                            {Array.isArray(comments) && comments.length > 0 ? (
                                comments.map(comment => (
                                    <div key={comment.comment_id}>
                                        {comment.comment_id === selectedCommentId ? (
                                            <div></div>
                                        ) : (
                                            <div className="relative">
                                                <div className="w-full my-4 cursor-pointer">
                                                    <MyComment commentInfo={comment} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="mt-40 flex flex-col items-center justify-center gap-8">
                                    <img className="w-20" src={noresult} alt="" />
                                    <div className="font-['Pretendard-Bold'] text-gray_01 text-[18px]">
                                        작성한 댓글이 없습니다
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {/* 내 채택 내역보기 */}
                    {ShowMyChosenComment && (
                        <div>
                            {Array.isArray(mychosen) && mychosen.length > 0 ? (
                                mychosen.map(chosencomment => (
                                    <div key={chosencomment.comment_id} className="w-full cursor-pointer my-4">
                                        <ChosenListCard chosenCommentInfo={chosencomment} />
                                    </div>
                                ))
                            ) : (
                                <div className="mt-40 flex flex-col items-center justify-center gap-8">
                                    <img className="w-20" src={noresult} alt="" />
                                    <div className="font-['Pretendard-Bold'] text-gray_01 text-[18px]">
                                        채택된 댓글이 없습니다
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DoggysActivity;
