import React from 'react';
import MainPageCard from '../components/MainPageCard';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';

export default function Main() {
    const topFiveRef = useRef(null);
    const queryClient = useQueryClient();
    const { data: topFive, error, isLoading } = useQuery(['posts', 'topfive'], () => apiPosts.getTopFive());
    console.log(topFive?.data.topfive);

    return (
        <>
            <div>안녕하세요 카드</div>
            <section>
                <span>top5 글</span>
                <motion.div ref={topFiveRef} className="overflow-hidden">
                    <motion.div drag="x" dragConstraints={topFiveRef} className="flex">
                        {topFive?.data.topfive.map(post => {
                            return (
                                <motion.div key={post.post_id} className="min-w-[144px] min-h-[144px] pr-2">
                                    <MainPageCard post={post} />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
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
