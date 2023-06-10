import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
    return (
        <div className="container place-content-center">
            <Header />
            {/* 공통영역 밑에 들어가는 콘텐츠 */}
            <div id="content" className="w-full py-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
