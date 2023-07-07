import React from 'react';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import PostListCard from '../components/PostListCard';
import { useInView } from 'react-intersection-observer';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getPostsTimeline = async (page, category, filter) => {
        const data = await axios.get(`https://howdoiapp.shop/api/list/0/0/${page}`);
        console.log('data', data);
        setPosts(prev => [...prev, ...data.data.mypage]);
        setLoading(true);
    };
    console.log('posts', posts);

    useEffect(() => {
        getPostsTimeline(page);
    }, [page]);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    const targetRef = useRef();

    useEffect(() => {
        if (loading) {
            const observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        loadMore();
                    }
                },
                { threshold: 1 }
            );

            observer.observe(targetRef.current);
        }
    }, [loading]);

    return (
        <div className="mx-5">
            {posts?.map(post => {
                return (
                    <div
                        key={post.post_id}
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
