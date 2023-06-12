import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className="bg-sky-50 w-full h-full min-h-screen">
            <Header />
            {/* Content that goes under the common area */}
            <div
                id="content"
                className="bg-sky-50 mx-auto pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen"
            >
                <Outlet className="z=0" />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
