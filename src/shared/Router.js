import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import MyPage from '../pages/MyPageContents/MyPage';
import PostQuestion from '../pages/PostQuestion';
import QuestionDetail from '../pages/QuestionDetail';
import QuestionList from '../pages/QuestionList';
import ScrapList from '../pages/ScrapList';
import SearchedList from '../pages/SearchedList';
import UserInfo from '../pages/SignupPages/UserInfo';
import SignUp from '../pages/SignupPages/SignUp';
import Confirm from '../pages/SignupPages/Confirm';
import Interest from '../pages/SignupPages/Interest';
import Main from '../pages/Main';
import DoggysActivity from '../pages/doggypages/DoggysActivity';

// 새로운 컨텍스트를 생성하고 내보냅니다

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 여기에서 Layout 컴포넌트를 사용하여 중첩된 라우트를 구성합니다. */}
                <Route path="/" element={<Layout />}>
                    {/* 회원 관련 */}
                    <Route path="login" element={<Login />} />
                    {/* 메인 화면 관련 */}
                    <Route path="/" element={<Main />} />
                    <Route path="question/:searchword" element={<SearchedList />} />
                    {/* 상세 화면 관련 */}
                    <Route path="detail/:id" element={<QuestionDetail />} />
                    {/* 생성 화면 관련 */}
                    <Route path="post" element={<PostQuestion />} />
                    {/* 스크랩 화면 관련 */}
                    <Route path="scrap" element={<ScrapList />} />
                    {/* 마이페이지 */}
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="activity" element={<DoggysActivity />} />

                    {/* 멤버십 등록 단계 */}
                    <Route path="interest" element={<Interest />} />
                    <Route path="userinfo" element={<UserInfo />} />
                    <Route path="confirm" element={<Confirm />} />
                    <Route path="signup" element={<SignUp />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
