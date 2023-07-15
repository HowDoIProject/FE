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
        if (user_type.user_type === '엄빠') {
            navigate('/momsactivity', {
                state: { user_type, nickname, user_id },
            });
        } else {
            navigate('/activity', {
                state: { user_type, nickname, user_id },
            });
        }
    };

    const handleViewDeleteInfo = () => {
        // Perform any necessary actions before navigating to the "/change" path
        // For example, you can check if the user is authenticated or authorized.

        // Navigate to the "/change" path
        navigate('/change');
    };

    console.log(user_type);
    console.log(user_id);
    console.log(nickname);
    // console.log(password);
    const closeModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    const renderModal = () => {
        if (!showModal) {
            return null;
        }

        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <p className="text-center">로그인 후에 이용하실 수 있습니다.</p>
                    <button
                        className="mt-4 mx-auto block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={closeModal}
                    >
                        닫기
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderModal()}

            <div className="max-w-sm mx-auto mt-10">
                <div className="flex items-center justify-center mt-10">
                    <img src={mypages} alt="My Pages" />
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
                                    <Link to="/change" onClick={handleViewDeleteInfo}>
                                        <h5>내 정보 보기/삭제</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-2">
                                {user_type === '엄빠' ? <ProfilePicture /> : <DoggyProfilePicture />}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-sm mx-auto mt-10">
                        <div className="bg-white-100 rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-6">
                                <button onClick={handleShowActivity} className="mr-4">
                                    내 활동 보기
                                </button>
                                <img src={arrows} onClick={handleShowActivity} className="h-6 ml-2" />
                            </div>
                            <hr className="border-gray-300 my-4" />
                            <div className="flex items-center mb-6">
                                {/* <button onClick={handleShowActivity} className="mr-4"> */}
                                고객센터(준비중)
                                {/* </button> */}
                            </div>
                            <hr className="border-gray-300 my-4" />
                            <div className="flex items-center mb-6">
                                <LogoutModal />
                                <img src={arrows} className="h-6 ml-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// import React, { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
// import DoggyProfilePicture from './DoggyProfilePic';
// import ProfilePicture from './MomProfilePic';
// import arrows from '../../assets/icon/arrow.svg';
// import mypages from '../../assets/icon/mypages.svg';
// import LogoutModal from './LogOutModal';

// export default function MyPage() {
//     const [cookies] = useCookies(['accessToken']);
//     const navigate = useNavigate();
//     const jwtToken = cookies.accessToken;
//     const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;

//     const user_type = decodedToken?.user_type;
//     const nickname = decodedToken?.nickname;
//     const user_id = decodedToken?.user_id;

//     // const [showModal, setShowModal] = useState(!decodedToken);

//     const handleShowActivity = () => {
//         if (user_type === '엄빠') {
//             navigate('/momsactivity', {
//                 state: { user_type, nickname, user_id },
//             });
//         } else {
//             navigate('/activity', {
//                 state: { user_type, nickname, user_id },
//             });
//         }
//     };

//     console.log(user_type);
//     console.log(user_id);
//     console.log(nickname);
//     // const closeModal = () => {
//     //     setShowModal(false);
//     //     navigate('/login');
//     // };

//     // const renderModal = () => {
//     //     if (!showModal) {
//     //         return null;
//     //     }

//     //     return (
//     //         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//     //             <div className="bg-white rounded-lg shadow-lg p-6">
//     //                 <p className="text-center">로그인 후에 이용하실 수 있습니다.</p>
//     //                 <button
//     //                     className="mt-4 mx-auto block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//     //                     onClick={closeModal}
//     //                 >
//     //                     닫기
//     //                 </button>
//     //             </div>
//     //         </div>
//     //     );
//     // };

//     return (
//         <>
//             {/* {renderModal()} */}

//             <div className="max-w-sm mx-auto mt-10">
//                 <div className="flex items-center justify-center mt-10">
//                     <img src={mypages} alt="My Pages" />
//                 </div>

//                 <div className="max-w-sm mx-auto mt-10">
//                     <div className="bg-white-100 rounded-lg shadow-md p-4">
//                         <div className="flex items-center justify-between">
//                             <div className="text-center">
//                                 <h1 className="text-lg font-bold mb-2">
//                                     환영합니다
//                                     <br />
//                                     {nickname && nickname.nickname}
//                                     {user_type && ` ${user_type.user_type}`}님
//                                 </h1>
//                                 <div className="mb-2">
//                                     <h5>내 정보 보기/삭제</h5>
//                                 </div>
//                             </div>
//                             <div className="p-2">
//                                 {user_type === '강아지' ? <ProfilePicture /> : <DoggyProfilePicture />}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="max-w-sm mx-auto mt-10">
//                         <div className="bg-white-100 rounded-lg shadow-md p-6">
//                             <div className="flex items-center mb-6">
//                                 <button onClick={handleShowActivity} className="mr-4">
//                                     내 활동 보기
//                                 </button>
//                                 <img src={arrows} onClick={handleShowActivity} className="h-6 ml-2" />
//                             </div>
//                             <hr className="border-gray-300 my-4" />
//                             <div className="flex items-center mb-6">
//                                 <button onClick={handleShowActivity} className="mr-4">
//                                     고객센터
//                                 </button>
//                             </div>
//                             <hr className="border-gray-300 my-4" />
//                             <div className="flex items-center mb-6">
//                                 <LogoutModal />
//                                 <img src={arrows} className="h-6 ml-6" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
