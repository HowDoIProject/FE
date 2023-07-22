import React from 'react';
import dog from '../assets/icon/welcomedog.svg';
import parents from '../assets/icon/welcomeparents.svg';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import HorizontalBarGraph from '../pages/doggypages/HorizontalBarGraph';

export default function WelcomeCardLoggedIn() {
    const navigate = useNavigate();

    const [cookies] = useCookies(['accessToken']);
    const jwtToken = cookies.accessToken;
    const decodedToken = jwtDecode(jwtToken);
    const {
        nickname: { nickname: loggedNickname },
        user_id: { user_id: loggedUserId },
        user_type: { user_type: loggedUserType },
    } = decodedToken;

    console.log('user_id', loggedUserId);
    return (
        <>
            {decodedToken && loggedUserType == '강아지' ? (
                <div className="w-full h-[146px] inline-flex px-6 py-4 justify-between items-center rounded-xl bg-bgcard shadow-mainbox">
                    <div className="flex flex-col items-start">
                        <h1 className="font-['Pretendard-Bold']">안녕하세요!</h1>
                        <h1 className="font-['Pretendard-Bold'] w-[180px] h-8 line-clamp-1">{loggedNickname}님</h1>
                        <h1 className="text-gray_02 text-[14px]">오늘도 자취 관련 고민은</h1>
                        <h1 className="text-gray_02 text-[14px]">하우두아이에 내려놓으세요!</h1>
                    </div>
                    <img src={dog} alt="" />
                </div>
            ) : (
                <div className="w-full">
                    <HorizontalBarGraph nickname={loggedNickname} />
                </div>

                // <div className="w-full h-[146px] inline-flex px-6 py-4 justify-between items-center rounded-xl bg-bgcard shadow-mainbox">
                //     <div className="flex flex-col items-start gap-2">
                //         <h1 className="font-['Pretendard-Bold']">안녕하세요!</h1>
                //         <h1 className="font-['Pretendard-Bold'] w-[180px] h-8 line-clamp-1">{loggedNickname}님</h1>
                //     </div>
                //     <img src={parents} alt="" />
                // </div>
            )}
        </>
    );
}
