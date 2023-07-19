import React, { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiGet } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import TotalScraps from '../components/TotalScrap';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function ScrapList() {
    const [scrap_check, setScrapCheck] = useState(false);
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });
    const [cookies] = useCookies(['accessToken']);
    const [showModal, setShowModal] = useState(false);

    const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['scrap', filter, category],
        getNextPageParam: lastPage => {
            if (lastPage.data.total_page === lastPage.data.page) return false;
            return lastPage.data.page + 1;
        },
        queryFn: ({ pageParam = 1 }) => apiGet.getScrap(filter, category, pageParam, cookies),
    });
    const accessToken = cookies.accessToken;
    console.log('data', data);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, accessToken, filter, category]);

    const queryClient = useQueryClient();

    const handleDeleteAllScraps = async () => {
        try {
            await axios.post(
                `https://howdoiapp.shop/api/scrap/${filter}/${category}`,
                { category, filter },
                {
                    headers: {
                        access: cookies.accessToken,
                    },
                }
            );
            refetch();
            console.log('성공적으로 전체 스크랩이 삭제되었습니다.');
            alert('스크랩이 모두 지워졌습니다.');
            //모달을 닫아준다.
            setShowModal(false);
            queryClient.invalidateQueries('scrap', { exact: true });
        } catch (error) {
            console.error('전체삭제 실패:', error);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="mx-5 item-align flex flex-col">
            <div className="self-end mt-4">
                <button onClick={openModal} className="px-1 py-1 bg-blue-400 text-white rounded hover:bg-blue-500">
                    전체 삭제
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

            {showModal && (
                <div className="fixed inset-0 flex align-items items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <p className="text-xl font-bold mb-4">정말 스크랩 된 글들을 모두 삭제하시겠어요?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={handleDeleteAllScraps}
                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-600 mr-2"
                            >
                                모두 삭제하기
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-500 rounded hover:bg-gray-200"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
