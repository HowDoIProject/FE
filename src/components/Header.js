import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon/logo.svg';

export default function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['verification']);
    const navigate = useNavigate();

    const handleLogout = () => {
        // 토큰 쿠키 제거
        removeCookie('verification');

        // 페이지 새로고침하여 제거된 것을 적용
        window.location.reload();

        // 추가적인 로그아웃 로직...
    };

    useEffect(() => {
        // ... 다른 useEffect 코드 ...
    }, [setCookie]);

    const handleLogin = () => {
        // 로그인 처리를 위한 로직
        navigate('/login');
    };

    return (
        <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20">
            <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                <img className="h-10" src={logo} alt="" />
                {/* {cookies['verification-token'] ? (
                    // 토큰 쿠키가 존재하면 로그아웃 버튼 표시
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                ) : (
                    // 토큰 쿠키가 존재하지 않으면 로그인 버튼 표시
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleLogin}
                    >
                        로그인
                    </button>
                )} */}
            </div>
        </div>
    );
}
