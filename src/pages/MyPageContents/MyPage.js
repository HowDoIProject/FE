import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Updated
import jwtDecode from 'jwt-decode';
import DoggyProfilePicture from './DoggyProfilePic';
import MomProfilePicture from './MomProfilePic';

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
        if (user_type === '엄빠') {
            navigate('/mom_activity', { state: { user_type, nickname, user_id } });
        } else {
            navigate('/activity', { state: { user_type, nickname, user_id } });
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Page</h1>
                </div>

                <div className="bg-white-100 rounded-lg p-4">
                    {user_type === 'Mom' ? <MomProfilePicture /> : <DoggyProfilePicture />}

                    <div className="bg-white-100 rounded-lg p-4">
                        <h1>
                            {nickname && nickname.nickname}
                            {user_type && ` ${user_type.user_type}`}님
                        </h1>
                    </div>
                    <div className="bg-white-100 rounded-lg p-4">
                        <button onClick={handleShowActivity}>내 활동 보기</button>
                    </div>
                </div>

                <div className="bg-white-200 rounded-lg p-4"></div>
            </div>
        </div>
    );
};

export default MyPage;
