import React from 'react';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';
import dog from '../assets/icon/commentdog.svg';
import parent from '../assets/icon/commentparent.svg';
import { formatAgo } from '../util/date';

export default function CommentCard({ commentInfo }) {
    const { comment, created_at, image, nickname, user_type } = commentInfo || {};
    const isDog = user_type === '강아지';
    console.log('comment', commentInfo);

    return (
        <>
            <div className="flex gap-2 items-center mt-4">
                {isDog ? <img className="" src={dog} alt="" /> : <img className="" src={parent} alt="" />}

                <h2>{nickname}</h2>
                <div className="text-gray_02">{isDog ? '강아지회원' : '엄빠회원'}</div>
            </div>

            <div className="flex flex-col py-4">
                <pre className="whitespace-pre-wrap">{comment}</pre>
                {image && <img className="w-14 h-14 rounded-lg object-cover mt-4" src={image} alt="" />}
                <div className="mt-5 text-gray_02">{formatAgo(created_at, 'ko')}</div>
            </div>
        </>
    );
}
