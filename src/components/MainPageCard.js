import React from 'react';

export default function MainPageCard({ post }) {
    return (
        <div className="w-full h-full bg-[#F3F3F3]">
            <h1 className="">{post.title}</h1>
        </div>
    );
}
