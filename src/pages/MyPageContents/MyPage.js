import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TableOfContents from './TableOfContents';
import PageContent from './PageContent';
import ProfilePicture from './ProfilePic';

const MyPage = () => {
    const location = useLocation();
    const user_type = location.state?.user_type || '';
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Page</h1>
                    <ProfilePicture />
                </div>
                <div className="bg-white-100 rounded-lg p-4">
                    <TableOfContents onPageChange={handlePageChange} user_type={user_type} />
                </div>
                <div className="bg-pink-200 rounded-lg p-4">
                    {user_type === '강아지' && <PageContent currentPage={currentPage} user_type={user_type} />}
                    {user_type === '엄빠' && <PageContent currentPage={currentPage} user_type={user_type} />}
                </div>
            </div>
        </div>
    );
};

export default MyPage;
