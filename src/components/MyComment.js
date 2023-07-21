import React from 'react';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comments from '../assets/icon/comment.svg';
import { formatAgo } from '../util/date';
import { useNavigate } from 'react-router-dom';

export default function CommentListCard({ commentInfo }) {
    const { like_num, user_type, post_id, scrap_num, comment_num, created_at, title, comment, category } = commentInfo;

    console.log('commentlistcard', commentInfo);

    const navigate = useNavigate();

    const isDog = user_type === '강아지';

    return (
        <div
            onClick={() => navigate(`/post/${post_id}`)}
            className="w-full h-full justify-between rounded-xl bg-gray_05 p-3 shadow-button"
        >
            <div className="flex mb-4">
                <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1">
                    {category}
                </div>
                <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
                    {isDog ? '질문글' : '꿀팁글'}
                </div>
            </div>
            <h1 className="line-clamp-2 w-[356px] h-6 text-[13px] text-gray_02">제목: {title}</h1>
            <h1 className="line-clamp-2 w-[356px] h-6 mb-3 text-[15px]">{comment}</h1>
            <div className="flex justify-between items-center">
                <div className="flex flex-row gap-6 text-[14px] items-center">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img className="w-4 h-4" src={like} alt="" />
                        {like_num}
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img className="w-4 h-4" src={scrap} alt="" />
                        {scrap_num}
                    </div>
                    <div className="flex items-center gap-1">
                        <img className="h-4 w-4" src={comments} alt="" />
                        {comment_num}
                    </div>
                </div>
                <div className="text-[13px] text-gray_02">{formatAgo(created_at, 'ko')}</div>
            </div>
        </div>
    );
}
