import React from 'react';
import { useRef, useEffect, useState } from 'react';

import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PostListCard from '../components/PostListCard';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import { useInView } from 'react-intersection-observer';

export default function PostList() {
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });

    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.getByFilterAndCategory(filter, category, pageParam),
    });

    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    const filterList = [
        { id: 1, name: '질문글' },
        { id: 2, name: '꿀팁글' },
    ];
    const categoryList = [
        { id: 1, name: '생활비' },
        { id: 2, name: '자취끼니' },
        { id: 3, name: '집안일' },
    ];

    return (
        <div className="mx-5">
            <div className="flex mt-4">
                {categoryList.map(item => (
                    <div
                        onClick={() => {
                            setCategory(item.id);
                            apiPosts.getByFilterAndCategory(filter, category, page);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
                {filterList.map(item => (
                    <div
                        onClick={() => {
                            setFilter(item.id);
                            apiPosts.getByFilterAndCategory(filter, category, page);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02 mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {data?.pages.map(page => (
                <div key={uuidv4()}>
                    {page.data.mypage && page.data.mypage.length > 0 ? (
                        page.data.mypage.map(post => (
                            <div
                                key={uuidv4()}
                                className="w-full h-auto my-4 cursor-pointer hover:scale-105 ease-in-out duration-300"
                            >
                                <PostListCard post={post} />
                            </div>
                        ))
                    ) : (
                        <div className="mt-40">검색 조건에 맞는 글이 없습니다아아아아</div>
                    )}
                </div>
            ))}
            <div ref={targetRef}>
                <div className="absolute bottom-0 w-[200px] h-[200px]"></div>
            </div>
        </div>
    );
}
