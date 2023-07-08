import React from 'react';
import { Link, useParams } from 'react-router-dom';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';

export default function ChosenListCard({ chosencomment }) {
    const { title, like_num, scrap_num, post, user_type, comment_num, created_at, user_id } = chosencomment;

    return (
        <Link to={`/post/${chosencomment.comment_id}`}>
            <div className="w-full h-full justify-between rounded-xl bg-gray_05 p-3">
                <div className="inline-flex text-white px-2 py-1 rounded-3xl bg-primary mb-5">
                    {chosencomment.category}
                </div>
                <h1 className="line-clamp-2 mb-5">{chosencomment.comment}</h1>
                <h1 className="line-clamp-2 mb-5">{title}</h1>

                <div className="flex flex-row gap-8">
                    <div className="flex flex-row items-center gap-1">
                        <img src={like} alt="" />
                        {chosencomment.like_num}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <img src={scrap} alt="" />
                        {chosencomment.scrap_num}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <img src={comment} alt="" />
                        {chosencomment.comment_num}
                    </div>
                </div>
            </div>
        </Link>
    );
}
