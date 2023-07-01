import React from 'react';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PostListCard from '../components/PostListCard';

export default function PostList() {
    const getPostsTimeline = async ({ pageParam = 1, filter = 0, category = 0 }) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/list/${filter}/${category}/${pageParam}`);
        console.log(res);
        return res;
    };

    const { data, fetchNextPage, hasNextPage, status, loading } = useInfiniteQuery({
        queryKey: ['posts', 'infinite'],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => getPostsTimeline(pageParam),
    });

    console.log('data', data);

    const target = useRef(null);

    useEffect(() => {
        if (loading) {
            //로딩되었을 때만 실행
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        fetchNextPage();
                    }
                },
                { threshold: 1 }
            );
            //옵져버 탐색 시작
            observer.observe(target.current);
        }
    }, [loading]);

    return (
        // <>
        //     {/* <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        //         {' '}

        //         {topFive?.data.topfive.map(post => {
        //             return (
        //                 <div
        //                     key={post.post_id}
        //                     className="w-[146px] h-[146px] pr-2 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
        //                 >
        //                     <PostListCard post={post} />
        //                 </div>
        //             );
        //         })}
        //     </InfiniteScroll> */}
        // </>

        <div className="relative">
            {data?.pages[0].data.mypage.map(post => {
                return (
                    <div
                        key={post.post_id}
                        className="w-full h-[140px] my-4 cursor-pointer hover:scale-105 ease-in-out duration-300"
                    >
                        <PostListCard post={post} />
                    </div>
                );
            })}
            <div className="absolute w-10 h-25" ref={target}></div>
        </div>
    );
}
