import React, { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiGet } from '../shared/Api';
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

    const queryClient = useQueryClient();
    const accessToken = cookies.accessToken;
    // 페이지에 scrap 된 부분만 가져오기
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['scrap', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page == lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiGet.getScrap(filter, category, pageParam, cookies),
    });

    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, accessToken, filter, category]);

    // 스크랩 삭제를 처리하는 함수
    const handleDeleteScrap = async (category, accessToken, filter) => {
        try {
            if (cookies.accessToken) {
                // 제공된 필터와 카테고리를 사용하여 API를 호출하여 스크랩을 삭제합니다.
                await apiGet.DeleteScrap(filter, category, accessToken);

                // 스크랩 상태를 삭제된 것으로 업데이트합니다.
                setScrapCheck(true);
                alert('스크랩이 삭제되었습니다');
                // 'scrap' 쿼리를 무효화하여 업데이트된 데이터를 다시 가져옵니다.
                queryClient.invalidateQueries('scrap', { exact: true });
            } else {
                console.error('쿠키에서 액세스 토큰을 찾을 수 없습니다');
            }
        } catch (error) {
            // 오류 처리
            console.error('스크랩 삭제 오류:', error);
        }
    };

    return (
        <div className="mx-5 item-align flex flex-col">
            {/* "삭제하기" 섹션을 오른쪽으로 이동 */}
            <div className="self-end mt-4">
                <button onClick={() => handleDeleteScrap(filter, cookies.accessToken, category)}>삭제하기</button>
            </div>
            {/* 스크랩 목록을 표시합니다. */}
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
