import React from 'react';
import MainPageCard from '../components/MainPageCard';
import { useRef, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import WelcomeCard from '../components/WelcomeCard';
import { Link } from 'react-router-dom';

export default function Main() {
    const queryClient = useQueryClient();
    const {
        data: topFive,
        errorTopfive,
        isLoadingTopfive,
    } = useQuery(['posts', 'topfive'], () => apiPosts.getTopFive());
    const { data, error, isLoading } = useQuery(['posts'], () => apiPosts.getAll());

    console.log('topfive', topFive?.data.topfive);
    console.log('allposts', data);

    const slider1 = useRef(null);
    const slider2 = useRef(null);

    const slideLeft = sliderRef => {
        sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 280;
    };

    const slideRight = sliderRef => {
        sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 280;
    };

    return (
        <>
            <div className="flex justify-center mx-5 my-9">
                <WelcomeCard />
            </div>
            <section className="mb-7">
                <h1 className="ml-7 font-bold">많은 도움됐어요를 받은글 TOP5</h1>
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
                        {topFive?.data.topfive.map(post => {
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
            <section className="mb-7">
                <div className="ml-7 flex justify-between ">
                    <h1 className="font-bold">실시간 글보기</h1>
                    <Link to={`/posts`}>
                        <div className="flex items-center">
                            <h1 className="text-sm text-gray_02">전체보기</h1>
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
                        {data?.data.posts.map(post => {
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
            <section className="mb-7">
                <h1 className="ml-7 font-bold">회원님을 위한 추천글</h1>
            </section>
        </>
    );
}
