import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';

export default function QuestionList() {
    const getPostsTimeline = async ({ pageParam = 1 }) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/post/${pageParam}`);
        console.log(res);
        return res;
    };

    const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(['posts'], getPostsTimeline, {
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
    });
    return (
        <>
            <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
                {/* <PostCard data={data} /> */}
            </InfiniteScroll>
        </>
    );
}
