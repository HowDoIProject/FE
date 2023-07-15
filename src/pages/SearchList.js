import { useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { apiPosts } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';
import PostListCard from '../components/PostListCard';

export default function SearchList() {
    const { keyword } = useParams();
    const queryClient = useQueryClient();
    const [cookies] = useCookies(['accessToken']);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });

    // const { isLoading, error, data } = useQuery(['posts', 'search', keyword], () =>
    //     apiPosts.search({ keyword, page, cookies })
    // );

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', 'search', keyword],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.search({ keyword, page, cookies }),
    });

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    console.log('keyword', keyword);
    console.log('searchdata', data);

    return (
        <div className="mx-5">
            {data?.pages.map(page => (
                <div key={uuidv4()}>
                    {page.data.result && page.data.result.length > 0 ? (
                        page.data.result.map(post => (
                            <div key={uuidv4()} className="w-full h-auto my-4 cursor-pointer">
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
