import React from 'react';

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full h-[80px] bg-sky-50 border-t-[0.5px] border-slate-300">
            <div className="w-full h-[52px] max-w-[420px] mx-auto bg-sky-50 text-zinc-700 text-sm flex justify-evenly items-center">
                <a href="/" className="no-underline hover:text-decoration-underline">
                    Home
                </a>
                <a href="/PostQuestion" className="no-underline hover:text-decoration-underline">
                    Upload post
                </a>
                <a href="/ScrapList" className="no-underline hover:text-decoration-underline">
                    Scrap
                </a>
                <a href="/MyPage" className="no-underline hover:text-decoration-underline">
                    My Page
                </a>
            </div>
        </div>
    );
}
