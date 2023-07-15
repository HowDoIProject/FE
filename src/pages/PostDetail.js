import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { apiPosts } from '../shared/Api';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';
import dog from '../assets/icon/commentdog.svg';
import parent from '../assets/icon/commentparent.svg';
import likeActive from '../assets/icon/likeActive.svg';
import scrapActive from '../assets/icon/scrapActive.svg';
import { formatAgo } from '../util/date';
import CommentCard from '../components/CommentCard';
import AddCommentForm from '../components/AddCommentForm';

export default function PostDetail() {
    const { post_id } = useParams();

    const [cookies] = useCookies(['accessToken']);

    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery(['post', post_id], () => apiPosts.getDetail(post_id, cookies));

    const {
        category,
        title,
        content,
        image,
        nickname,
        created_at,
        like_num,
        scrap_num,
        user_type,
        user_id: userIdPost,
        like_check,
        scrap_check,
    } = data?.data.post[0] || {};

    console.log('postdetail', data);

    const { mutate: updateLikeMutate } = useMutation({
        mutationFn: apiPosts.updatePostLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', post_id] });
        },
    });

    const { mutate: updateScrapMutate } = useMutation({
        mutationFn: apiPosts.updatePostScrap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', post_id] });
        },
    });

    const isDog = user_type === '강아지';

    return (
        <>
            <div className="flex flex-col mb-2 mt-4 justify-center items-center">
                <div className="w-[360px] flex-start flex gap-3 items-center">
                    <div>
                        {isDog ? (
                            <img className="w-12 h-12 rounded-full border border-gray_04 " src={dog} alt="" />
                        ) : (
                            <img className="w-12 h-12 rounded-full" src={parent} alt="" />
                        )}
                    </div>
                    <div>
                        <div className="font-['Pretendard-Medium'] text-[14px]">{nickname}</div>
                        <div className="text-[13px] text-gray_02">{isDog ? '강아지회원' : '엄빠회원'}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mb-3">
                <div className="w-[360px] bg-gray_05 rounded-xl shadow-button">
                    <div className="p-4">
                        <div className="flex mb-5">
                            <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1">
                                {category}
                            </div>
                            <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
                                {isDog ? '질문글' : '꿀팁글'}
                            </div>
                        </div>

                        <h1 className="mb-5 font-['Pretendard-Bold']">{title}</h1>
                        <div className="whitespace-pre-wrap text-[15px]">{content}</div>
                    </div>
                    <div className="p-4">
                        <div className="mb-4 text-gray_02 text-[14px]">{formatAgo(created_at, 'ko')} </div>
                        <div className="flex gap-4">
                            <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => {
                                    updateLikeMutate({ userIdPost, post_id, cookies });
                                }}
                            >
                                <img className="w-4 h-4" src={like_check ? likeActive : like} alt="" />
                                {like_num}
                            </div>
                            <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => {
                                    updateScrapMutate({ userIdPost, post_id, cookies });
                                }}
                            >
                                <img className="w-4 h-4" src={scrap_check ? scrapActive : scrap} alt="" />
                                {scrap_num}
                            </div>
                            <div className="flex items-center gap-1">
                                <img className="w-4 h-4" src={comment} alt="" />
                                {data?.data.comment.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-[144px] mt-6">
                <ul className="w-[360px] bg-gray_05 rounded-lg divide-y divide-y-reverse divide-gray_04 shadow-button flex flex-col-reverse">

                    {data?.data.comment.map(comment => {
                        return (
                            <li className="px-4" key={comment.comment_id}>
                                <CommentCard
                                    postDetailData={data}
                                    commentInfo={comment}
                                    post_id={post_id}
                                    userIdPost={userIdPost}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex justify-center bottom-[80px] fixed ml-[30px]">
                <AddCommentForm post_id={post_id} />
            </div>
        </>
    );
}
