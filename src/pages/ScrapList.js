import React, { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import TotalScraps from '../components/TotalScrap';
import { useCookies } from 'react-cookie';
import DeleteScrapButton from '../components/DeleteScrapButton';

export default function ScrapList() {
    const [cookies] = useCookies(['accessToken']);
    const [scrap_check, setScrapCheck] = useState(false);
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });

    const queryClient = useQueryClient();
    const accessToken = cookies.accessToken;

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['scrap', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.getScrap(filter, category, pageParam, cookies),
    });

    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, accessToken, scrap_check]);

    return (
        <div className="mx-5 item-align flex flex-col">
            {/* Move the "삭제하기" section to the right side */}
            <div className="self-end mt-4">
                <DeleteScrapButton filter={filter} category={category} accessToken={cookies.accessToken} />
            </div>

            <TotalScraps
                data={data}
                category={category}
                setCategory={setCategory}
                filter={filter}
                setFilter={setFilter}
                page={page}
                cookies={cookies}
            />

            <div ref={targetRef}>
                <div className="absolute bottom-0 w-[200px] h-[200px]"></div>
            </div>
        </div>
    );
}
