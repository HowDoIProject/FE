import React from 'react';
import MainPageCard from '../components/MainPageCard';
import { useRef, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Main() {
    const queryClient = useQueryClient();
    const { data: topFive, error, isLoading } = useQuery(['posts', 'topfive'], () => apiPosts.getTopFive());

    console.log(topFive?.data.topfive);

    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 280;
    };

    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 280;
    };

    return (
        <>
            <div>안녕하세요 카드</div>
            <section>
                <span>top5 글</span>
                <div className="relative flex items-center">
                    <MdChevronLeft
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={slideLeft}
                        size={30}
                    />
                    <div
                        id="slider"
                        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                    >
                        {topFive?.data.topfive.map(post => {
                            return (
                                <div
                                    key={post.post_id}
                                    className="w-[146px] h-[146px] pr-2 inline-block cursor-pointer hover:scale-105 ease-in-out duration-300"
                                >
                                    <MainPageCard post={post} />
                                </div>
                            );
                        })}
                    </div>
                    <MdChevronRight
                        className="opacity-50 cursor-pointer hover:opacity-100"
                        onClick={slideRight}
                        size={30}
                    />
                </div>
            </section>
            <div>
                <span>실시간 글</span>
            </div>
            <div>
                <span>추천 글</span>
            </div>
        </>
    );
}
