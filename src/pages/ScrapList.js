import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import TotalScraps from '../components/TotalScrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function PostList() {
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });

    const queryClient = useQueryClient();
    const [cookies] = useCookies(['accessToken']);
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page === lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.getByFilterAndCategory(filter, category, pageParam, { cookies: true }),
        filterFn: pages => {
            // Filter the posts based on scrap_check
            return pages.flatMap(page => page.data.mypage.filter(post => post.scrap_check));
        },
    });

    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, cookies]);

    return (
        <div className="mx-5">
            <div className="flex w-full mt-4"></div>
            <TotalScraps
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
