import React from 'react';
import MainPageCard from '../components/MainPageCard';
import { useRef, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import WelcomeCardNotLoggedIn from '../components/WelcomeCardNotLoggedIn';
import { Link } from 'react-router-dom';
import WelcomeCardLoggedIn from '../components/WelcomeCardLoggedIn';
import SearchBar from '../components/SearchBar';
import MainPageCardNotLogged from '../components/MainPageCardNotLogged';

export default function Main() {
    const queryClient = useQueryClient();
    const [cookies] = useCookies(['accessToken']);
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);

    const {
        data: topFive,
        errorTopfive,
        isLoadingTopfive,
    } = useQuery(['posts', 'topFive'], () => apiPosts.getPopular(1, cookies)); //맨 위 5글만 알면 되므로 첫 페이지만 호출

    const { data, error, isLoading } = useQuery(['posts', 'main'], () =>
        apiPosts.getByFilterAndCategory(0, 0, 1, cookies)
    );

    const { data: recommendData } = useQuery(['posts', 'recommend'], () => apiPosts.getRecommend(cookies));

    console.log('recommendData', recommendData);

    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const slider3 = useRef(null);

    const slideLeft = sliderRef => {
        sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 280;
    };

    const slideRight = sliderRef => {
        sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 280;
    };

    return (
        <>
            <SearchBar />
            <div className="flex justify-center mb-6 mx-5">
                {cookies.accessToken ? <WelcomeCardLoggedIn /> : <WelcomeCardNotLoggedIn />}
            </div>
            <section className="mb-6">
                <h1 className="ml-7 font-['Pretendard-Bold']">많은 도움됐어요를 받은글 TOP5</h1>
                <div className="relative flex items-center">
                    <MdChevronLeft
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={() => slideLeft(slider1)}
                        size={20}
                    />
                    <div
                        ref={slider1}
                        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                    >
                        {topFive?.data.result
                            .filter((item, index) => index < 5)
                            .map(post => {
                                return (
                                    <div
                                        key={post.post_id}
                                        className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
                                    >
                                        <MainPageCard post={post} />
                                    </div>
                                );
                            })}
                    </div>
                    <MdChevronRight
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={() => slideRight(slider1)}
                        size={20}
                    />
                </div>
            </section>
            <section className="mb-6">
                <div className="ml-7 flex justify-between ">
                    <h1 className="font-['Pretendard-Bold']">실시간 글보기</h1>
                    <Link to={`/posts`}>
                        <div className="flex items-center">
                            <h1 className="text-sm text-gray_02 text-[14px]">전체보기</h1>
                            <MdChevronRight className="text-gray_02" size={20} />
                        </div>
                    </Link>
                </div>
                <div className="relative flex items-center">
                    <MdChevronLeft
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={() => slideLeft(slider2)}
                        size={20}
                    />
                    <div
                        ref={slider2}
                        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                    >
                        {data?.data.mypage.map(post => {
                            return (
                                <div
                                    key={post.post_id}
                                    className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
                                >
                                    <MainPageCard post={post} />
                                </div>
                            );
                        })}
                    </div>
                    <MdChevronRight
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={() => slideRight(slider2)}
                        size={20}
                    />
                </div>
            </section>
            <section className="mb-6">
                <h1 className="ml-7 font-['Pretendard-Bold']">회원님을 위한 추천글</h1>
                <div className="relative flex items-center">
                    <MdChevronLeft
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={() => slideLeft(slider3)}
                        size={20}
                    />
                    <div
                        ref={slider3}
                        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                    >
                        {/* {recommendData?.data.result.map(post => {
                            return (
                                <div
                                    key={post.post_id}
                                    className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
                                >
                                    <MainPageCard post={post} />
                                </div>
                            );
                        })} */}
                        {cookies.accessToken ? (
                            recommendData?.data.result.map(post => {
                                return (
                                    <div
                                        key={post.post_id}
                                        className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
                                    >
                                        <MainPageCard post={post} />
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <div className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300">
                                    <MainPageCardNotLogged />
                                </div>
                                <div className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300">
                                    <MainPageCardNotLogged />
                                </div>
                                <div className="w-[146px] h-[146px] m-3 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300">
                                    <MainPageCardNotLogged />
                                </div>
                            </>
                        )}
                    </div>
                    <MdChevronRight
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={() => slideRight(slider3)}
                        size={20}
                    />
                </div>
            </section>
        </>
    );
}
