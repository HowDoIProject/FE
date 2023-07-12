import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import MyPage from '../pages/MyPageContents/MyPage';
import ScrapList from '../pages/ScrapList';
import SearchList from '../pages/SearchList';
import UserInfo from '../pages/SignupPages/UserInfo';
import SignUp from '../pages/SignupPages/SignUp';
import Confirm from '../pages/SignupPages/Confirm';
import Interest from '../pages/SignupPages/Interest';
import Main from '../pages/Main';
import DoggysActivity from '../pages/doggypages/DoggysActivity';
import MomsActivity from '../pages/momspages/MomsActivity';
import WritePost from '../pages/WritePost';
import PostDetail from '../pages/PostDetail';
import PostList from '../pages/PostList';
import PopularPosts from '../components/PopularPosts';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 여기에서 Layout 컴포넌트를 사용하여 중첩된 라우트를 구성합니다. */}
                <Route element={<Layout />}>
                    {/* 회원 관련 */}
                    <Route path="/login" element={<Login />} />
                    {/* 메인 화면 관련 */}
                    <Route path="/" element={<Main />} />
                    <Route path="/posts/:keyword" element={<SearchList />} />
                    {/* 게시판 화면 관련 */}
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/posts/popular" element={<PopularPosts />} />
                    {/* 상세 화면 관련 */}
                    <Route path="/post/:post_id" element={<PostDetail />} />
                    {/* 생성 화면 관련 */}
                    <Route path="/write" element={<WritePost />} />
                    {/* 스크랩 화면 관련 */}
                    <Route path="/scrap" element={<ScrapList />} />
                    {/* 마이페이지 */}
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/activity" element={<DoggysActivity />} />
                    <Route path="/momactivity" element={<MomsActivity />} />

                    {/* 멤버십 등록 단계 */}
                    <Route path="/interest" element={<Interest />} />
                    <Route path="/userinfo" element={<UserInfo />} />
                    <Route path="/confirm" element={<Confirm />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
