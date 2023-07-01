import React from 'react';
import image from '../assets/icon/welcome.svg';

export default function WelcomeCard() {
    return (
        <div className="w-full h-[146px] inline-flex px-6 py-4 justify-center items-center rounded-xl bg-bgcard shadow-mainbox">
            <div className="flex flex-col gap-4 items-start">
                <h1 className="font-bold">자취고민을 함께 나누고 해결하는 하우두아이!</h1>
                <h3 className="text-gray_02 font-light text-xl">로그인 후 정보 확인이 가능합니다</h3>
            </div>
            <img src={image} alt="" />
        </div>
    );
}
