import { useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { apiPosts } from '../shared/Api';

export default function SearchList() {
    const { keyword } = useParams();
    const queryClient = useQueryClient();
    const [cookies] = useCookies(['accessToken']);
    const [page, setPage] = useState(1);

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', keyword],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.search(keyword, pageParam, cookies),
    });

    // const { isLoading, error, data } = useQuery(['posts', keyword], () => apiPosts.search({ keyword, page, cookies }));

    console.log('keyword', keyword);
    console.log('searchdata', data);

    return <div>검색결과</div>;
}
