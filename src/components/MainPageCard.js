import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function MainPageCard({ post }) {
    const { post_id, category, title, user_type } = post;

    const isDog = user_type == '강아지';

    return (
        <Link to={`/post/${post_id}`}>
            <div className="w-full h-full p-3 rounded-xl bg-bgjoin shadow-mainbox">
                <div className="flex mb-8">
                    <div className="inline-flex text-white text-[11px] px-2 py-1 rounded-2xl bg-primary mr-1">
                        {category}
                    </div>
                    <div className="inline-flex text-white text-[11px] px-2 py-1 rounded-2xl bg-gray_02">
                        {isDog ? '질문글' : '꿀팁글'}
                    </div>
                </div>
                <div className="line-clamp-3 w-[122px] h-15 font-['Pretendard-Medium']">{title}</div>
            </div>
        </Link>
    );
}
