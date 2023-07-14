import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/icon/logo.svg';

export default function Header() {
    const [cookies, _, removeCookie] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const logout = () => {
        const result = confirm('정말 로그아웃 하시겠습니까?');
        if (result) {
            removeCookie('accessToken', { path: '/' }); //path넣어줘야 삭제가 바로 됨.
            alert('로그아웃 되었습니다!');
            navigate('/');
        }
    };

    return (
        <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
            <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                <Link to={'/'}>
                    <img className="h-10" src={logo} alt="" />
                </Link>
                {cookies.accessToken ? (
                    <div
                        className="px-3 py-1 rounded-3xl bg-gray_03 text-white text-[14px] cursor-pointer"
                        onClick={logout}
                    >
                        로그아웃
                    </div>
                ) : (
                    <div
                        className="px-3 py-2 rounded-3xl bg-primary text-white text-[14px] cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        로그인
                    </div>
                )}
            </div>
        </div>
    );
}
