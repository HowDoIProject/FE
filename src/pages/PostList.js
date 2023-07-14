import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PostListCard from '../components/PostListCard';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import TotalPosts from '../components/TotalPosts';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function PostList() {
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });
    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);

    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.getByFilterAndCategory(filter, category, pageParam, cookies),
    });

    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    return (
        <div className="mx-5">
            <div className="flex w-full mt-4">
                <div className="inline-flex w-1/2 justify-center py-3 border-b-2 border-b-main text-[14px] cursor-pointer">
                    전체글
                </div>
                <div
                    onClick={() => navigate('/posts/popular')}
                    className="inline-flex w-1/2 justify-center py-3 text-[14px] text-gray_02 cursor-pointer"
                >
                    인기글
                </div>
            </div>
            <TotalPosts
                data={data}
                category={category}
                setCategory={setCategory}
                filter={filter}
                setFilter={setFilter}
                page={page}
            />
            <div ref={targetRef}>
                <div className="absolute bottom-0 w-[200px] h-[200px]"></div>
            </div>
        </div>
    );
}
