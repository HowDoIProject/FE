import React from 'react';
import image from '../assets/icon/welcome.svg';
import { useNavigate } from 'react-router-dom';

export default function WelcomeCardNotLoggedIn() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[146px] inline-flex px-6 py-4 justify-center items-center rounded-xl bg-bgcard shadow-mainbox">
            <div className="flex flex-col gap-4 items-start">
                <h1 className="font-['Pretendard-Bold']">자취고민을 함께 나누고 해결하는 하우두아이!</h1>
                <div className="flex items-center justify-center">
                    <div
                        onClick={() => navigate('/login')}
                        className="text-gray_02 border-b border-b-gray_02 mr-1 font-bold text-[14px] cursor-pointer"
                    >
                        로그인
                    </div>
                    <h1 className="text-gray_02 text-[14px]">후 정보 확인이 가능합니다</h1>
                </div>
            </div>
            <img src={image} alt="" />
        </div>
    );
}
