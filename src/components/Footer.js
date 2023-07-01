import React from 'react';
import main from '../assets/icon/main.svg';
import write from '../assets/icon/write.svg';
import posts from '../assets/icon/posts.svg';
import mypage from '../assets/icon/mypage.svg';

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full h-[80px] bg-white border-t-[0.5px] border-slate-300">
            <div className="w-full h-[52px] max-w-[420px] mx-auto bg-white text-zinc-700 text-sm flex justify-evenly items-center">
                <a href="/" className="no-underline hover:text-decoration-underline">
                    메인
                </a>
                <a href="/posts" className="no-underline hover:text-decoration-underline">
                    게시판
                </a>
                <a href="/write" className="no-underline hover:text-decoration-underline">
                    글 올리기
                </a>
                <a href="/mypage" className="no-underline hover:text-decoration-underline">
                    마이페이지
                </a>
            </div>
        </div>
    );
}
