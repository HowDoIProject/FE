import React from 'react';
import { Link, useParams } from 'react-router-dom';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';

export default function PostListCard({ post }) {
    return (
        <Link to={`/post/${post.post_id}`}>
            <div className="w-full h-full justify-between rounded-xl bg-gray_05 p-3">
                <div className="inline-flex text-white px-2 py-1 rounded-3xl bg-primary mb-5">{post.category}</div>
                <h1 className="line-clamp-2 mb-5">{post.title}</h1>
                <div className="flex flex-row gap-8">
                    <div className="flex flex-row items-center gap-1">
                        <img src={like} alt="" />
                        {post.like_num}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <img src={scrap} alt="" />
                        {post.scrap_num}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <img src={comment} alt="" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
