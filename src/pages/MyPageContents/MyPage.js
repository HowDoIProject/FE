import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import DoggyProfilePicture from './DoggyProfilePic';
import ProfilePicture from './MomProfilePic';
import arrows from '../../assets/icon/arrow.svg';
import mypages from '../../assets/icon/mypages.svg';

export default function MyPage() {
    const navigate = useNavigate();

    const [cookies] = useCookies(['accessToken']);
    const jwtToken = cookies.accessToken;
    const decodedToken = jwtDecode(jwtToken);

    const user_type = decodedToken.user_type;
    const nickname = decodedToken.nickname;
    const user_id = decodedToken.user_id;

    const handleShowActivity = () => {
        if (user_type.user_type === '엄빠') {
            navigate('/momactivity', {
                state: { user_type, nickname, user_id },
            });
        } else {
            navigate('/activity', {
                state: { user_type, nickname, user_id },
            });
        }
    };

    return (
        <>
            <div className="flex items-center justify-center mt-10">
                <img src={mypages} />
            </div>

            <div className="max-w-sm mx-auto mt-10">
                <div className="bg-white-100 rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <h1 className="text-lg font-bold mb-2">
                                환영합니다
                                <br />
                                {nickname && nickname.nickname}
                                {user_type && ` ${user_type.user_type}`}님
                            </h1>
                            <div className="mb-2">
                                <h5>내 정보 보기/삭제</h5>
                            </div>
                        </div>
                        <div className="p-2">
                            {user_type === '강아지' ? <ProfilePicture /> : <DoggyProfilePicture />}
                        </div>
                    </div>
                </div>

                <div className="max-w-sm mx-auto mt-10">
                    <div className="bg-white-100 rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-6">
                            <button onClick={handleShowActivity} className="mr-4">
                                내 활동 보기
                            </button>
                            {/* <div className="border border-gray-300 flex-grow"></div> */}
                            <img src={arrows} onClick={handleShowActivity} className="h-6 ml-2" />
                        </div>
                        <hr className="border-gray-300 my-4" />
                        <div className="flex items-center mb-6">
                            <button onClick={handleShowActivity} className="mr-4">
                                고객센터
                            </button>
                            {/* <div className="border border-gray-300 flex-grow"></div> */}
                            <img src={arrows} onClick={handleShowActivity} className="h-6 ml-2" />
                        </div>
                        <hr className="border-gray-300 my-4" />
                        <div className="flex items-center mb-6">
                            <button onClick={handleShowActivity} className="mr-4">
                                로그아웃
                            </button>
                            {/* <div className="border border-gray-300 flex-grow"></div> */}
                            <img src={arrows} onClick={handleShowActivity} className="h-6 ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
