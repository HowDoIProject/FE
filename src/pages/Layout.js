import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className="container place-content-center">
            <Header />
            {/* Content that goes under the common area */}
            <div id="content" className="w-full py-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
