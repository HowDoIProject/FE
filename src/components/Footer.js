import React from 'react';
import home from '../assets/icon/home.svg';
import post from '../assets/icon/post.svg';
import feed from '../assets/icon/feed.svg';
import mypage from '../assets/icon/mypage.svg';

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full h-[80px] bg-white border-t-[0.5px] border-slate-300">
            <div className="w-full h-[56px] max-w-[420px] mt-2 mx-auto bg-white flex justify-evenly items-center">
                <div className="flex flex-col min-w-[94px] items-center justify-center gap-1">
                    <img src={home} alt={home} />
                    <a href="/" className="no-underline hover:text-decoration-underline">
                        메인
                    </a>
                </div>
                <div className="flex flex-col min-w-[94px]  items-center justify-center gap-1">
                    <img src={feed} alt={feed} />{' '}
                    <a href="/posts" className="no-underline hover:text-decoration-underline">
                        게시판
                    </a>
                </div>
                <div className="flex flex-col min-w-[94px]  items-center justify-center gap-1">
                    <img src={post} alt={post} />
                    <a href="/write" className="no-underline hover:text-decoration-underline">
                        글 올리기
                    </a>
                </div>
                <div className="flex flex-col min-w-[94px]  items-center justify-center gap-1">
                    <img src={mypage} alt={mypage} />{' '}
                    <a href="/mypage" className="no-underline hover:text-decoration-underline">
                        마이페이지
                    </a>
                </div>
            </div>
        </div>
    );
}
