import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/icon/logo.svg';

export default function Login() {
    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['accessToken']);
    const navigate = useNavigate();

    const handleUserNumberChange = event => {
        setUserNumber(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (userNumber && password) {
            alert('로그인 성공!😃');

            try {
                const response = await axios.post('https://howdoiapp.shop/api/login', {
                    user_number: userNumber,
                    password: password,
                });

                if (response.status === 200) {
                    const { access } = response.data;

                    setCookie('accessToken', access, { path: '/', secure: true });
                    navigate('/Mypage');
                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                alert('로그인에 실패했습니다.🥲');
                console.error('Login failed:', error);
            }
        }
    };

    return (
        <>
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <Link to={'/'}>
                        <img className="h-10" src={logo} alt="" />
                    </Link>
                </div>
            </div>

            <div className="flex h-full my-[120px] w-[320px] justify-center items-center mx-auto">
                <form className="m-auto w-[320px]" onSubmit={handleSubmit}>
                    <div className="mb-8 font-['Pretendard-Bold'] text-[22px]">로그인</div>
                    <div className="flex flex-col mb-4">
                        <label className="font-['Pretendard-Medium'] text-[14px] mb-2" htmlFor="user_number">
                            핸드폰 번호
                        </label>
                        <input
                            className="w-full p-3 border border-gray_03 rounded-xl"
                            type="text"
                            id="user_number"
                            placeholder="'-' 없이 전화번호 입력"
                            required
                            value={userNumber}
                            onChange={handleUserNumberChange}
                        />
                    </div>
                    <div className="flex flex-col mb-12">
                        <label className="font-['Pretendard-Medium'] text-[14px] mb-2" htmlFor="password">
                            비밀번호
                        </label>
                        <input
                            className="w-full p-3 border border-gray_03 rounded-xl"
                            type="password"
                            id="password"
                            placeholder="비밀번호 입력"
                            autoComplete="off"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <button className="bg-primary text-white py-4 rounded-xl w-full text-[14px]" type="submit">
                            로그인
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-white rounded-xl text-primary border border-primary text-[14px] py-4 w-full"
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
