import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comments from '../assets/icon/comment.svg';
import { formatAgo } from '../util/date';
import { useCookies } from 'react-cookie';
import likeActive from '../assets/icon/likeActive.svg';
import scrapActive from '../assets/icon/scrapActive.svg';
import { apiPosts } from '../shared/Api';
// import moment from 'moment';

export default function CommentListCard({ post, comment, comment_id, user_id }) {
    const { like_num, scrap_num, user_type, comment_num, post_id } = comment;
    const [cookies] = useCookies(['accessToken']);
    const [isLike, setIsLike] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    const queryClient = useQueryClient();
    const { mutate: updateLikeMutate } = useMutation({
        mutationFn: apiPosts.updateCommentLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'], comment_id, post_id });
        },
    });

    const { mutate: updateScrapMutate } = useMutation({
        mutationFn: apiPosts.updatePostScrap,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'], comment_id, post_id });
        },
    });

    const isDog = user_type === '강아지';
    const navigate = useNavigate();
    // const parsedCreatedAt = moment(created_at);
    // const formattedCreatedAt = parsedCreatedAt.fromNow();

    return (
        <>
            <div
                onClick={() => navigate(`/post/${post_id}`)}
                className="w-full h-full justify-between rounded-xl bg-gray_05 p-3 shadow-button"
            >
                <div className="flex mb-4">
                    {/* <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1"></div> */}
                    <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
                        {isDog ? '질문글' : '꿀팁글'}
                    </div>
                </div>
                <h1 className="line-clamp-2 w-[356px] h-12 mb-3 text-[15px]">{comment}</h1>
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-6 text-[14px] items-center">
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                // setIsLike(!isLike);
                                updateLikeMutate({ user_id, comment_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={isLike ? likeActive : like} alt="" />
                            {like_num}
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                // setIsScrap(!isScrap);
                                updateScrapMutate({ user_id, comment_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={isScrap ? scrapActive : scrap} alt="" />
                            {scrap_num}
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="h-4 w-4" src={comments} alt="" />
                            {comment_num}
                        </div>
                    </div>
                    {/* <div className="text-[14px] text-gray_02">{formatAgo(created_at, 'ko')}</div> */}
                </div>
            </div>
        </>
    );
}
