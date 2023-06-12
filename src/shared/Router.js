import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import PostQuestion from '../pages/PostQuestion';
import QuestionDetail from '../pages/QuestionDetail';
import QuestionList from '../pages/QuestionList';
import ScrapList from '../pages/ScrapList';
import SearchedList from '../pages/SearchedList';
import UserInfo from '../pages/SignupPages/UserInfo';
import SignUp from '../pages/SignupPages/SignUp';
import Confirm from '../pages/SignupPages/Confirm';
import MobileAuthScreen from '../pages/SignupPages/MobileAuth';
import Interest from '../pages/SignupPages/Interest';

// Create and export a new context
export const MembershipContext = React.createContext();

const SignUpinitialValues = {
    type: '',
    phoneNumber: '',
    userInfo: {
        name: '',
        email: '',
        address: '',
        // 추가 필드
    },
    interest: '',
    confirm: false,
};

const Router = () => {
    return (
        <MembershipContext.Provider value={SignUpinitialValues}>
            <BrowserRouter>
                <Routes>
                    {/* Here we use the Layout component to construct nested routes. */}
                    <Route path="/" element={<Layout />}>
                        {/* Member related */}
                        <Route path="login" element={<Login />} />

                        {/* Main screen related */}
                        <Route path="/" element={<QuestionList />} />
                        <Route path="question/:searchword" element={<SearchedList />} />

                        {/* Detailed screen related */}
                        <Route path="detail/:id" element={<QuestionDetail />} />

                        {/* Create screen related */}
                        <Route path="post" element={<PostQuestion />} />

                        {/* Scrap screen related */}
                        <Route path="scrap" element={<ScrapList />} />

                        {/* my page */}
                        <Route path="mypage" element={<MyPage />} />

                        {/* Membership registration steps */}
                        <Route path="MobileAuth" element={<MobileAuthScreen />} />
                        <Route path="UserInfo" element={<UserInfo />} />
                        <Route path="confirm" element={<Confirm />} />
                        <Route path="interest" element={<Interest />} />
                        <Route path="signup" element={<SignUp />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </MembershipContext.Provider>
    );
};

export { Router as default };
