import React from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiPosts } from '../shared/Api';
import { v4 as uuidv4 } from 'uuid';
import PostListCard from './PostListCard';

export default function PopularPosts() {
    const queryClient = useQueryClient();
    const { data } = useQuery(['posts', 'popular'], () => apiPosts.getPopular());

    const navigate = useNavigate();

    console.log('data', data);
    return (
        <>
            <div className="mx-5">
                <div className="flex w-full mt-4 mb-10">
                    <div
                        onClick={() => navigate('/posts')}
                        className="inline-flex w-1/2 justify-center py-3  text-gray_02 cursor-pointer text-[14px]"
                    >
                        전체글
                    </div>
                    <div className="inline-flex w-1/2 justify-center py-3 text-[14px] cursor-pointer border-b-2 border-b-main">
                        인기글
                    </div>
                </div>
                {data?.data.topfive.map(post => (
                    <div
                        key={uuidv4()}
                        className="w-full h-auto my-4 cursor-pointer hover:scale-105 ease-in-out duration-300"
                    >
                        <PostListCard post={post} />
                    </div>
                ))}
            </div>
        </>
    );
}
