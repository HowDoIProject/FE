import React, { useState } from 'react';
import TableOfContents from './TableOfContents';
import PageContent from './PageContent';
import ProfilePicture from './ProfilePic';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

const MyPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [cookies] = useCookies(['verification']);

    // Retrieve the JWT token from the cookie
    const jwtToken = cookies.verification;

    // JWT TOKEN decoding
    const decodedToken = jwtDecode(jwtToken);

    const user_type = decodedToken.user_type;
    const nickname = decodedToken.nickname;
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const renderPageContent = () => {
        if (user_type === '강아지' || user_type === '엄빠') {
            return <PageContent currentPage={currentPage} user_type={user_type} />;
        }
        return null;
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Page</h1>
                </div>

                <div className="bg-white-100 rounded-lg p-4">
                    <ProfilePicture />
                    <div>
                        <text>
                            {nickname && nickname.nickname}
                            {user_type && ` ${user_type.user_type}`}님
                        </text>
                    </div>
                    <TableOfContents onPageChange={handlePageChange} user_type={user_type} />
                </div>
                <div className="bg-pink-200 rounded-lg p-4">{renderPageContent()}</div>
            </div>
        </div>
    );
};

export default MyPage;
