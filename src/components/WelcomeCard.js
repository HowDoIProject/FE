import React from 'react';
import image from '../assets/icon/dog_1.svg';

export default function WelcomeCard() {
    return (
        <div className="w-full h-[146px] inline-flex px-6 py-4 justify-center items-center bg-[#F3F3F3]">
            <div className="flex flex-col gap-4 items-start">
                <h1 className="text-bold">자취고민을 해결해줄 하우두아이!</h1>
                <h1 className="line-clamp-2">로그인 후 정보 확인이 가능합니다</h1>
            </div>
            <div className="w-20 h-20 flex justify-center items-center rounded-full bg-[#D9D9D9]">
                <img src={image} alt="" />
            </div>
        </div>
    );
}
