import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';
import dog from '../assets/icon/dog.svg';
import parent from '../assets/icon/parent.svg';
import { formatAgo } from '../util/date';

export default function PostDetail() {
    const { post_id } = useParams();

    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery(['post', post_id], () => apiPosts.getDetail(post_id), {
        staleTime: 1000 * 60 * 1,
    });
    // console.log(data?.data);

    const { category, title, content, image, nickname, created_at, like_num, scrap_num, user_type } =
        data?.data.post || {};

    const isDog = user_type === '강아지';

    return (
        <>
            <div className="flex flex-col ml-6 mb-1 mt-4">
                <div>
                    <div className="inline-flex text-white px-2 py-1 rounded-3xl bg-primary mb-2">{category}</div>
                </div>

                <div className="flex gap-1">
                    <div>
                        {isDog ? (
                            <img className="w-11 h-11 rounded-full border border-gray_04 " src={dog} alt="" />
                        ) : (
                            <img className="w-11 h-11 rounded-full" src={parent} alt="" />
                        )}
                    </div>
                    <div>
                        <h2>{nickname}</h2>
                        <div className="text-gray_02">{isDog ? '강아지회원' : '엄빠회원'}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-[360px] bg-gray_05 rounded-lg">
                    <div className="mb-4 p-4">
                        <h1 className="mb-4 font-bold">{title}</h1>
                        <pre className="whitespace-pre-wrap">{content}</pre>
                        <img src={image} alt="" />
                    </div>
                    <div className="p-4">
                        <div className="mb-4">{formatAgo(created_at, 'ko')} </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <img src={like} alt="" />
                                {like_num}
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={scrap} alt="" />
                                {scrap_num}
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={comment} alt="" />
                                {data?.data.comments.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
