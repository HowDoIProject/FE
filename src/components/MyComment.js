import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comments from '../assets/icon/comment.svg';
import { useCookies } from 'react-cookie';
import likeActive from '../assets/icon/likeActive.svg';
import { apiPosts } from '../shared/Api';

export default function CommentListCard({ comment, comment_id, userIdPost }) {
    const { like_num, user_type, post_id } = comment;
    // const { comment_num, created_at } = comment;
    const [like_check, setIsLike] = useState(false);

    const [cookies] = useCookies(['accessToken']);
    const queryClient = useQueryClient();

    const { mutate: updateCommentLikeMutate } = useMutation({
        mutationFn: apiPosts.updateCommentLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', post_id] });
        },
    });
    // const { mutate: updateScrapMutate } = useMutation({
    //     mutationFn: apiPosts.updatePostScrap,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['comments'], comment_id, post_id });
    //     },
    // });

    const isDog = user_type === '강아지';

    // if (!comment) {
    //     return null; // 코멘트가 없을 경우 null이나 원하는 대체 UI를 반환합니다.
    // }

    return (
        <div className="w-full h-full justify-between rounded-xl bg-gray_05 p-3 shadow-button">
            <div className="flex mb-4">
                <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
                    {isDog ? '질문글' : '꿀팁글'}
                </div>
            </div>
            <h1 className="line-clamp-2 w-[356px] h-12 mb-3 text-[15px]">{comment.comment}</h1>
            <div className="flex justify-between items-center">
                <div className="flex flex-row gap-6 text-[14px] items-center">
                    <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={e => {
                            e.stopPropagation();
                            setIsLike(!like_check);
                            updateCommentLikeMutate({ userIdPost, comment_id, cookies });
                        }}
                    >
                        <img className="w-4 h-4" src={like_check ? likeActive : like} alt="" />
                        {like_num}
                    </div>
                    {/* <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={e => {
                            e.stopPropagation();
                            updateScrapMutate({ user_id, comment_id, cookies });
                        }}
                    >
                        <img className="w-4 h-4" src={isScrap ? scrapActive : scrap} alt="" />
                        {scrap_num}
                    </div> */}
                    {/* <div className="flex items-center gap-1">
                        <img className="h-4 w-4" src={comments} alt="" />
                        {comment_num}
                    </div> */}
                </div>
                {/* <div className="text-[14px] text-gray_02">{formatAgo(created_at, 'ko')}</div> */}
            </div>
        </div>
    );
}
