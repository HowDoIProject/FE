import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery(['post', post_id], () => apiPosts.getDetail(post_id));

    const { category, title, content, image, nickname, created_at, like_num, scrap_num, user_type, user_id } =
        data?.data.post || {};

    const { mutate: updateLikeMutate } = useMutation({
        mutationFn: apiPosts.updateLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', post_id] });
        },
    });

    const { mutate: updateScrapMutate } = useMutation({
        mutationFn: apiPosts.updateScrap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', post_id] });
        },
    });

    const isDog = user_type === '강아지';

    return (
        <>
            <div className="flex flex-col mb-1 mt-4 justify-center items-center">
                <div className="w-[360px] flex-start flex gap-3 mb-2">
                    <div>
                        {isDog ? (
                            <img className="w-12 h-12 rounded-full border border-gray_04 " src={dog} alt="" />
                        ) : (
                            <img className="w-12 h-12 rounded-full" src={parent} alt="" />
                        )}
                    </div>
                    <div>
                        <h2>{nickname}</h2>
                        <div className="text-gray_02">{isDog ? '강아지회원' : '엄빠회원'}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mb-3">
                <div className="w-[360px] bg-gray_05 rounded-lg">
                    <div className="mb-4 p-4">
                        <div className="inline-flex text-white px-2 py-1 rounded-2xl bg-primary mb-2">{category}</div>

                        <h1 className="mb-4 font-bold">{title}</h1>
                        <pre className="whitespace-pre-wrap">{content}</pre>
                        <img src={image} alt="" />
                    </div>
                    <div className="p-4">
                        <div className="mb-4 text-gray_02">{formatAgo(created_at, 'ko')} </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <img
                                    onClick={() => {
                                        setIsLike(!isLike);
                                        updateLikeMutate({ user_id, post_id, cookies });
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                    src={isLike ? likeActive : like}
                                    alt=""
                                />
                                {like_num}
                            </div>
                            <div className="flex items-center gap-1">
                                <img
                                    onClick={() => {
                                        setIsScrap(!isScrap);
                                        updateScrapMutate({ user_id, post_id, cookies });
                                    }}
                                    className="w-5 h-5 cursor-pointer"
                                    src={isScrap ? scrapActive : scrap}
                                    alt=""
                                />
                                {scrap_num}
                            </div>
                            <div className="flex items-center gap-1">
                                <img className="w-5 h-5" src={comment} alt="" />
                                {data?.data.comments.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-3">
                <ul className="w-[360px] bg-gray_05 rounded-lg divide-y divide-gray_03 ">
                    {data?.data.comments.map(comment => {
                        return (
                            <li className="px-4" key={comment.comment_id}>
                                <CommentCard commentInfo={comment} post_id={post_id} />
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex justify-center items-center">
                <AddCommentForm post_id={post_id} />
            </div>
        </>
    );
}
