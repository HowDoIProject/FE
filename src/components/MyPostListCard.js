import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';
import { formatAgo } from '../util/date';
import { useCookies } from 'react-cookie';
import likeActive from '../assets/icon/likeActive.svg';
import scrapActive from '../assets/icon/scrapActive.svg';
import { apiPosts } from '../shared/Api';

export default function MyPostListCard({ post, post_id }) {
    const { category, title, like_num, scrap_num, user_type, comment_num, created_at, user_id } = post;
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [cookies] = useCookies(['accessToken']);
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    const queryClient = useQueryClient();
    const { mutate: updateLikeMutate } = useMutation({
        mutationFn: apiPosts.updatePostLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'], post_id });
        },
    });

    const { mutate: updateScrapMutate } = useMutation({
        mutationFn: apiPosts.updatePostScrap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'], post_id });
        },
    });

    const handleEdit = () => {
        // Rest of the function code
        setFilteredPosts(); // Call the function to update the posts list
    };

    const isDog = user_type === '강아지';
    const navigate = useNavigate();
    return (
        <>
            <div
                onClick={() => navigate(`/post/${post_id}`)}
                className="w-full h-full justify-between rounded-xl bg-gray_05 p-3 shadow-button"
            >
                <div className="flex mb-4">
                    <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1">
                        {category}
                    </div>
                    <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
                        {isDog ? '질문글' : '꿀팁글'}
                    </div>
                </div>
                <h1 className="line-clamp-2 w-[356px] h-12 mb-3 text-[15px]">{title}</h1>
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-6 text-[14px] items-center">
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                setIsLike(!isLike);
                                updateLikeMutate({ user_id, post_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={isLike ? likeActive : like} alt="" />
                            {like_num}
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                setIsScrap(!isScrap);
                                updateScrapMutate({ user_id, post_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={isScrap ? scrapActive : scrap} alt="" />
                            {scrap_num}
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="h-4 w-4" src={comment} alt="" />
                            {comment_num}
                        </div>
                    </div>
                    <div className="text-[14px] text-gray_02">{formatAgo(created_at, 'ko')}</div>
                </div>
            </div>
        </>
    );
}
