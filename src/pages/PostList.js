import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PostListCard from '../components/PostListCard';

export default function PostList() {
    const getPostsTimeline = async ({ pageParam = 1 }) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/post/${pageParam}`);
        console.log(res);
        return res;
    };

    const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
        queryKey: ['posts', 'infinite'],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => getPostsTimeline(pageParam),
    });

    console.log(data);
    return (
        <>
            {/* <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
                {' '}
                
                {topFive?.data.topfive.map(post => {
                    return (
                        <div
                            key={post.post_id}
                            className="w-[146px] h-[146px] pr-2 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
                        >
                            <PostListCard post={post} />
                        </div>
                    );
                })}
            </InfiniteScroll> */}
        </>
    );
}
