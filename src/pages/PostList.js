import React from 'react';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PostListCard from '../components/PostListCard';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';

export default function PostList() {
    // const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState(0);
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);

    // const getPostsTimeline = async (filter, category, page) => {
    //     const data = await axios.get(`https://howdoiapp.shop/api/list/${filter}/${category}/${page}`);
    //     console.log('data', data);
    //     console.log('필터카테고리페이지', filter, category, page);
    //     if (data.data.page > data.data.total_page) return;
    //     setPosts(prev => [...prev, ...data.data.mypage]);
    //     console.log('posts', posts);
    //     setLoading(true);
    // };
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery(['posts', filter, category, page], () =>
        apiPosts.getByFilterAndCategory(filter, category, page)
    );

    console.log('data', data);

    // useEffect(() => {
    //     getPostsTimeline(filter, category, page);
    // }, [filter, category, page]);

    // const loadMore = () => {
    //     setPage(prev => prev + 1);
    // };

    // useEffect(() => {
    //     getPostsTimeline(filter, category, page);
    // }, [filter, category, page]);

    const targetRef = useRef();

    // useEffect(() => {
    //     if (isLoading) {
    //         const observer = new IntersectionObserver(
    //             entries => {
    //                 if (entries[0].isIntersecting) {
    //                     loadMore();
    //                 }
    //             },
    //             { threshold: 1 }
    //         );
    //         observer.observe(targetRef.current);
    //     }
    // }, [isLoading]);

    const filterList = [
        { id: 1, name: '질문글' },
        { id: 2, name: '꿀팁글' },
    ];
    const categoryList = [
        { id: 1, name: '생활비' },
        { id: 2, name: '자취끼니' },
        { id: 3, name: '집안일' },
    ];

    return (
        <div className="mx-5">
            <div className="flex mt-4">
                {categoryList.map(item => (
                    <div
                        onClick={() => {
                            setCategory(item.id);
                            apiPosts.getByFilterAndCategory(filter, category, page);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
                {filterList.map(item => (
                    <div
                        onClick={() => {
                            setFilter(item.id);
                            apiPosts.getByFilterAndCategory(filter, category, page);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02 mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {data?.data.mypage.map(post => {
                return (
                    <div
                        key={uuidv4()}
                        className="w-full h-auto my-4 cursor-pointer hover:scale-105 ease-in-out duration-300"
                    >
                        <PostListCard post={post} />
                    </div>
                );
            })}
            <div className="absolute bottom-0 w-[100px] h-[100px] bg-primary opacity-30" ref={targetRef}></div>
        </div>
    );
}
