import React from 'react';

export default function MainPageCard({ post }) {
    return (
        <div className="w-full h-full flex flex-col gap-6 px-4 pt-4 pb-10 items-center bg-[#F3F3F3]">
            <div>{post.category}</div>
            <h1 className="line-clamp-2">{post.title}</h1>
        </div>
    );
}
