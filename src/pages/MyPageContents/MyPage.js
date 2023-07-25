import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import DoggyProfilePicture from './DoggyProfilePic';
import ProfilePicture from './MomProfilePic';
import arrows from '../../assets/icon/arrow.svg';
import mypages from '../../assets/icon/mypages.svg';
import LogoutModal from './LogOutModal';
import { MdPassword } from 'react-icons/md';
import Footer from '../../components/Footer';

export default function MyPage() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    const jwtToken = cookies.accessToken;
    const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;
    const user_type = decodedToken?.user_type;
    const nickname = decodedToken?.nickname;
    const user_id = decodedToken?.user_id;
    const [showModal, setShowModal] = useState(!jwtToken || !decodedToken);

    const handleShowActivity = () => {
        navigate('/activity', {
            state: { user_type, nickname, user_id },
        });
    };

    // const handleViewDeleteInfo = () => {
    //     // Perform any necessary actions before navigating to the "/change" path
    //     // For example, you can check if the user is authenticated or authorized.

    //     // Navigate to the "/change" path
    //     navigate('/change');
    // };

    // console.log(password);
    // const closeModal = () => {
    //     setShowModal(false);
    //     navigate('/login');
    // };

    // const renderModal = () => {
    //     if (!showModal) {
    //         return null;
    //     }

    //     return (
    //         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    //             <div className="bg-white rounded-lg shadow-lg p-6">
    //                 <p className="text-center">로그인 후에 이용하실 수 있습니다.</p>
    //                 <button
    //                     className="mt-4 mx-auto block px-4 py-2 bg-primary text-white rounded-md"
    //                     onClick={closeModal}
    //                 >
    //                     닫기
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <>
            {/* {renderModal()} */}
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <div className="mx-auto font-['Pretendard-Bold']">마이페이지</div>
                </div>
            </div>
            <div className="mx-auto bg-bgjoin pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen relative">
                <div className="mx-10">
                    <div className="flex items-center justify-between bg-white shadow-mainbox p-6 rounded-xl mt-[96px]">
                        <div>
                            <div className="font-['Pretendard-Bold'] text-[15px] flex flex-col flex-start">
                                <div>안녕하세요</div>
                                <div className="flex gap-1">
                                    <div className="line-clamp-1">{nickname && nickname.nickname}</div>
                                    <div className="line-clamp-1"> {user_type && ` ${user_type.user_type}`}님!</div>
                                </div>
                            </div>
                            <div>
                                {/* <Link to="/change" onClick={handleViewDeleteInfo}>
                                        <h5>내 정보 보기/삭제</h5>
                                    </Link> */}
                            </div>
                        </div>
                        <div className="">{user_type === '엄빠' ? <ProfilePicture /> : <DoggyProfilePicture />}</div>
                    </div>
                    <div className="flex flex-col bg-white shadow-mainbox p-6 rounded-xl mt-[96px] font-['Pretendard-Medium'] text-[15px]">
                        <div onClick={handleShowActivity} className="flex items-center justify-between mb-4">
                            <button>내 활동 보기</button>
                            <img src={arrows} className="h-5" />
                        </div>
                        <hr className="border-gray-03" />
                        <div className="flex items-center my-4">고객센터 (준비중)</div>
                        <hr className="border-gray-03" />
                        <div className="flex items-center justify-between mt-4">
                            <LogoutModal className="cursor-pointer" />
                            <img src={arrows} className="h-5" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
