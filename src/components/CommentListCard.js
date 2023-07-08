import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiPosts } from '../shared/Api';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comments from '../assets/icon/comment.svg';
import { formatAgo } from '../util/date';
import likeActive from '../assets/icon/likeActive.svg';
import scrapActive from '../assets/icon/scrapActive.svg';
import commentdot from '../assets/icon/commentdot.svg';
import ModalComment from './ModalComment';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

export default function CommentListCard({ comment, commentInfo, comment_id }) {
    const [cookies] = useCookies(['accessToken']);
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { category, like_num, scrap_num, post_id, user_type, comment_num, created_at, user_id } = comment;

    const queryClient = useQueryClient();
    const { mutate: updateLikeMutate } = useMutation({
        mutationFn: apiPosts.updatePostLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
        },
    });

    const { mutate: updateScrapMutate } = useMutation({
        mutationFn: apiPosts.updatePostScrap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });
        },
    });

    const handleModalClick = e => {
        e.stopPropagation();
        setModalOpen(!modalOpen);
    };

    return (
        <Link to={`/post/${comment_id}`}>
            <div className="w-full h-full justify-between rounded-xl bg-gray_05 p-3" onClick={handleModalClick}>
                <div className="flex justify-end">
                    <img className="cursor-pointer" src={commentdot} alt="" />
                </div>
                {modalOpen && <ModalComment commentInfo={commentInfo} post_id={post_id} />}
                <div className="inline-flex text-white px-2 py-1 rounded-3xl bg-primary mb-5">{category}</div>
                <h1 className="line-clamp-2 mb-5">{comment.comment}</h1>
                <div className="flex flex-row gap-8">
                    <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => {
                            setIsLike(!isLike);
                            updateLikeMutate({ user_id, post_id, cookies, comment_id });
                        }}
                    >
                        <img className="w-4 h-4" src={isLike ? likeActive : like} alt="" />
                        {like_num}
                    </div>
                    <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => {
                            setIsScrap(!isScrap);
                            updateScrapMutate({ user_id, post_id, cookies, comment_id });
                        }}
                    >
                        <img className="w-4 h-4" src={isScrap ? scrapActive : scrap} alt="" />
                        {scrap_num}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <img src={comments} alt="" />
                        {comment_num}
                    </div>
                    <Link to={`/post/${comment.comment_id}`}>
                        <div className="text-[14px] text-gray_02">{formatAgo(created_at, 'ko')}</div>
                    </Link>
                </div>
            </div>
        </Link>
    );
}
