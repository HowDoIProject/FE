import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function MainPageCard({ post }) {
    return (
        <Link to={`/post/${post.post_id}`}>
            <div className="w-full h-full flex flex-col gap-6 pt-4 pb-10 items-center rounded-xl bg-bgjoin shadow-mainbox">
                <div>{post.category}</div>
                <div className="w-[105px] line-clamp-3">{post.title}</div>
            </div>
        </Link>
    );
}
