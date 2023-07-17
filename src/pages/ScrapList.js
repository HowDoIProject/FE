import React, { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import TotalScraps from '../components/TotalScrap';
import { useCookies } from 'react-cookie';
// import DeleteScrapButton from '../components/DeleteScrapButton';

export default function ScrapList() {
    const [cookies] = useCookies(['accessToken']);
    const [scrap_check, setScrapCheck] = useState(false);
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });

    // const queryClient = useQueryClient();
    const accessToken = cookies.accessToken;

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['scraps', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiPosts.getScrap(filter, category, pageParam, cookies),
    });

    console.log('data', data);

    // useEffect(() => {
    //     if (inView && hasNextPage) fetchNextPage();
    // }, [inView]);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, accessToken, scrap_check]);

    const handleDeleteScrap = async (category, cookies, filter) => {
        try {
            if (cookies && cookies.accessToken) {
                await apiPosts.DeleteScrap(filter, category, cookies);
                // Handle any necessary actions after deleting the scrap post
            } else {
                // Handle the case when accessToken is not available in cookies
                console.error('Access token not found in cookies');
            }
        } catch (error) {
            // Handle the error
            console.error('Error deleting scrap:', error);
        }
    };

    return (
        <div className="mx-5 item-align flex flex-col">
            {/* Move the "삭제하기" section to the right side */}
            <div className="self-end mt-4">
                <button
                    onClick={() => handleDeleteScrap(filter, cookies, category)}
                    data-filter={filter}
                    data-category={category}
                    data-access-token={cookies.accessToken}
                >
                    삭제하기
                </button>
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
