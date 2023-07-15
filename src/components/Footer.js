import React from 'react';
import home from '../assets/icon/home.svg';
import post from '../assets/icon/post.svg';
import feed from '../assets/icon/feed.svg';
import mypage from '../assets/icon/mypage.svg';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


export default function Footer() {
    const [cookies] = useCookies(['accessToken']);
    return (
        <div className="fixed bottom-0 w-full h-[80px] bg-white border-t-[0.5px] border-slate-300">
            <div className="w-full h-[56px] max-w-[420px] mt-2 mx-auto bg-white flex justify-evenly items-center">
                <Link to="/" className="flex flex-col min-w-[94px] items-center justify-center gap-1">
                    <img src={home} alt={home} />
                    <h1>메인</h1>
                </Link>
                <Link to="/posts" className="flex flex-col min-w-[94px] items-center justify-center gap-1">
                    <img src={feed} alt={feed} />
                    <h1>게시판</h1>
                </Link>
                <Link
                    to={cookies.accessToken ? '/write' : '/login'}
                    className="flex flex-col min-w-[94px] items-center justify-center gap-1"
                >
                    <img src={post} alt={post} />
                    <h1>글 올리기</h1>
                </Link>
                <Link to="/mypage" className="flex flex-col min-w-[94px] items-center justify-center gap-1">
                    <img src={mypage} alt={mypage} />
                    <h1>마이페이지</h1>
                </Link>
            </div>
        </div>
    );
}
