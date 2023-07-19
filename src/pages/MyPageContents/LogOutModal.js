import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LogoutModal() {
    const [showModal, setShowModal] = useState(false);
    const [cookies, removeCookie] = useCookies(['accessToken']);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie('accessToken', { path: '/' }); //path넣어줘야 삭제가 바로 됨.
        alert('로그아웃 되었습니다!');
        // setShowModal(false);
        navigate('/');
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="mr-4">
                로그아웃
            </button>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-orange-200 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8">
                        <p>정말로 로그아웃 하시겠습니까?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleLogout}
                                className="bg-orange-500 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                네
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                            >
                                아니오
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogoutModal;
