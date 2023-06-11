import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import PostQuestion from '../pages/PostQuestion';
import QuestionDetail from '../pages/QuestionDetail';
import QuestionList from '../pages/QuestionList';
import ScrapList from '../pages/ScrapList';
import SearchedList from '../pages/SearchedList';
import SignUp from '../pages/SignUp';
import MobileAuthScreen from '../components/SignupPages/MobileAuth';

const Router = () => {
    return (
        // url 라우터 처리
        <BrowserRouter>
            <Routes>
                {/* 공통영역(상단 gnb메뉴)을 위한 Layout  */}
                <Route element={<Layout />}>
                    {/* 회원 관련 */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    {/* 메인화면 관련 */}
                    <Route path="/" element={<QuestionList />} />
                    <Route path="/question/:searchword" element={<SearchedList />} />
                    {/* 상세화면 관련 */}
                    <Route path="/detail/:id" element={<QuestionDetail />} />
                    {/* 작성화면 관련 */}
                    <Route path="/post" element={<PostQuestion />} />
                    {/* 스크랩화면 관련 */}
                    <Route path="/scrap" element={<ScrapList />} />
                    {/* 마페이지 */}
                    <Route path="/mypage" element={<MyPage />} />
                    {/*휴대전화인증*/}
                    <Route path="/MobileAuth" element={<MobileAuthScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
