import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Updated
import jwtDecode from 'jwt-decode';
import ProfilePicture from './ProfilePic';

const MyPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    const [cookies] = useCookies(['accessToken']);
    const jwtToken = cookies.accessToken;
    const decodedToken = jwtDecode(jwtToken);

    const user_type = decodedToken.user_type;
    const nickname = decodedToken.nickname;
    const user_id = decodedToken.user_id;

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleShowActivity = () => {
        navigate('/activity', { state: { user_type, nickname, user_id } });
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
                        <h1>
                            {nickname && nickname.nickname}
                            {user_type && ` ${user_type.user_type}`}님
                        </h1>
                    </div>

                    <button onClick={handleShowActivity}>내 활동 보기</button>
                </div>

                <div className="bg-pink-200 rounded-lg p-4"></div>
            </div>
        </div>
    );
};

export default MyPage;
