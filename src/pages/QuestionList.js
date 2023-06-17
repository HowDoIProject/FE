import React from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
export default function QuestionList() {
    const getPostsTimeline = async ({ pageParam = 1 }) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/post/${pageParam}`);
        console.log(res);
        return res;
    };

    const { data, fetchNextPage, status } = useInfiniteQuery(['posts'], getPostsTimeline, {
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return page + 1;
        },
    });
    return <>질문게시판</>;
}
