import React, { useRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import question from '../assets/icon/question.svg';
import { apiGet } from '../shared/Api';
import { useInView } from 'react-intersection-observer';
import TotalScraps from '../components/TotalScrap';
import { useCookies } from 'react-cookie';
//전체 삭제 주석처리 해놓음
export default function ScrapList() {
    const [cookies] = useCookies(['accessToken']);
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [targetRef, inView] = useInView({
        threshold: 1,
    });
    const [showModal, setShowModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
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

    // const handleDeleteAllScraps = async () => {
    //     try {
    //         await axios.post(
    //             `https://howdoiapp.shop/api/scrap/${filter}/${category}`,
    //             { filter, category },
    //             {
    //                 headers: {
    //                     access: cookies.accessToken,
    //                 },
    //             }
    //         );
    //         refetch();
    //         console.log('성공적으로 전체 스크랩이 삭제되었습니다.');
    //         // alert('스크랩이 모두 지워졌습니다.');
    //         //모달을 닫아준다.
    //         openSecondModal();
    //         queryClient.invalidateQueries('scrap', { exact: true });
    //     } catch (error) {
    //         console.error('전체삭제 실패:', error);
    //     }
    // };

    // const openModal = () => {
    //     setShowModal(true);
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    // };
    // //두번째 모달창을 열면서 첫번째 모달창을 닫아준다.
    // const openSecondModal = () => {
    //     setShowSecondModal(true);
    //     closeModal();
    // };
    // const closeSecondModal = () => {
    //     setShowSecondModal(false);
    // };

    return (
        <div className="mx-5 item-align flex flex-col">
            <div className="bg-orange-50 p-5 rounded-lg max-w-md mx-auto my-8">
                <div className="flex items-center mt-4">
                    <img src={question} alt="Question Icon" className="mr-2" />
                    <p className="text-left text-sm">
                        스크랩된 글 삭제를 원하신다면, 스크랩버튼을 한 번 더 눌러주세요!
                    </p>
                </div>
            </div>

            <div className="mx-5 item-align flex flex-col">
                {/* <div className="self-end item-align">
                    <button onClick={openModal} className="text-xl font-bold text-center underline">
                        모두삭제
                    </button>
                </div> */}
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
                    <div className="flex justify-center items-center h-screen" ref={targetRef}>
                        <div className="w-1/2 h-1/2">스크랩 된 글이 없습니다.</div>
                    </div>
                </div>

                {/* {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <p className="text-xl font-bold mb-4 text-center">
                                정말로 스크랩 된 글들을
                                <br /> 모두 삭제 하시겠습니까?
                            </p>
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={handleDeleteAllScraps}
                                    className="w-80 px-10 py-2 bg-orange-300 text-white rounded hover:bg-orange-400 mb-2"
                                >
                                    모두 삭제하기
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="w-80 px-10 py-2 bg-whitesmoke-300 text-gray-500 rounded hover:bg-gray-200 mb-2"
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showSecondModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <p className="text-xl font-bold mb-4 text-center">
                                스크랩된 글들을 모두가 삭제 하였습니다.
                            </p>
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={closeSecondModal}
                                    className="px-40 py-2 bg-whitesmoke-300 text-gray-500 rounded hover:bg-gray-200 mb-2"
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}
