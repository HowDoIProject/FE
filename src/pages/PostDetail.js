import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';

export default function PostDetail() {
    const { post_id } = useParams();

    const queryClient = useQueryClient();
    const { data, error, isLoading, refetch } = useQuery(['post', post_id], () => apiPosts.getDetail(post_id));

    console.log(data?.data.post);
    const { category, title, content, image, nickname, created_at } = data?.data.post || {};

    return (
        <>
            <div>{category}</div>
            <div>
                <img src={image} alt="" />
                <h2>{nickname}</h2>
            </div>
            <div className="h-[306px] w-[339px] bg-gray_05">
                <h1>{title}</h1>
                <div>{content}</div>
                <div>{created_at}</div>
                <div className="flex flex-row">
                    <img src={like} alt="" />
                    <img src={scrap} alt="" />
                    <img src={comment} alt="" />
                </div>
            </div>
        </>
    );
}
