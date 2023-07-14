import React, { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiPosts } from '../shared/Api';
import { v4 as uuidv4 } from 'uuid';
import PostListCard from './PostListCard';
import { useInView } from 'react-intersection-observer';
import { useCookies } from 'react-cookie';

export default function PopularPosts() {
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });
    const queryClient = useQueryClient();

    const [cookies] = useCookies(['accessToken']);

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', 'popular'],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.getPopular(pageParam, cookies),
    });

    const navigate = useNavigate();
    console.log('인기글무한스크롤data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    return (
        <>
            <div className="mx-5">
                <div className="flex w-full mt-4 mb-8">
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
                {data?.pages.map(page => (
                    <div key={uuidv4()}>
                        {page.data.result && page.data.result.length > 0 ? (
                            page.data.result.map(post => (
                                <div key={uuidv4()} className="w-full h-auto my-4 cursor-pointer">
                                    <PostListCard post={post} />
                                </div>
                            ))
                        ) : (
                            <div className="mt-40">인기글이 없습니다</div>
                        )}
                    </div>
                ))}
                <div ref={targetRef}>
                    <div className="absolute bottom-0 w-[200px] h-[200px]"></div>
                </div>
            </div>
        </>
    );
}
