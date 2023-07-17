import React from 'react';

export default function MainPageCardNotLogged({ post }) {
    return (
        <div className="w-full h-full p-3 rounded-xl bg-bgjoin shadow-mainbox">
            <div className="flex mb-6">
                <div className="inline-flex text-white text-[11px] px-2 py-1 rounded-2xl bg-primary mr-1">자취끼니</div>
                <div className="inline-flex text-white text-[11px] px-2 py-1 rounded-2xl bg-gray_02">꿀팁글</div>
            </div>
            <div className="line-clamp-3 w-[122px] h-15 font-['Pretendard-Medium'] text-gray_02">
                <div>로그인 후</div>
                <div>확인이 가능합니다</div>
            </div>
        </div>
    );
}
