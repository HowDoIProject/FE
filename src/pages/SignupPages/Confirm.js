import React, { useState, useContext } from 'react';
import axios from 'axios';

// 데이터를 전달하기 위한 context 생성
const RegistrationContext = React.createContext();

// 등록 및 확인 페이지 컴포넌트
function RegistrationConfirmationPage() {
    const [isRegistered, setRegistered] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        // API 엔드포인트로 데이터 전송
        try {
            await axios.post('http://3.34.191.171/api/signup');

            // 등록 성공 시 상태 업데이트
            setRegistered(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <RegistrationContext.Provider value={{ isRegistered, setRegistered }}>
            <div>
                {!isRegistered ? (
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            등록
                        </button>
                    </form>
                ) : (
                    <div>
                        <h1>등록 완료!</h1>
                        <span>등록되었습니다!</span>
                        <svg
                            className="h-6 w-6 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
            </div>
        </RegistrationContext.Provider>
    );
}

export default RegistrationConfirmationPage;
