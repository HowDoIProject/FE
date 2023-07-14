import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';
import dog from '../assets/icon/commentdog.svg';
import parent from '../assets/icon/commentparent.svg';
import commentdot from '../assets/icon/commentdot.svg';
import likeActive from '../assets/icon/likeActive.svg';
import { formatAgo } from '../util/date';
import ModalComment from './ModalComment';
import { apiPosts } from '../shared/Api';

export default function CommentCard({ commentInfo, post_id, userIdPost }) {
    const { comment, created_at, image, nickname, user_type, comment_id, like_num, user_id, chosen, like_check } =
        commentInfo || {};

    const [cookies] = useCookies(['accessToken']);
    const jwtToken = cookies.accessToken;
    const decodedToken = jwtDecode(jwtToken);
    const {
        user_id: { user_id: loggedUserId },
    } = decodedToken;

    console.log('commentInfo', commentInfo);

    const [modalOpen, setModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: updateCommentLikeMutate } = useMutation({
        mutationFn: apiPosts.updateCommentLike,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', post_id] });
        },
    });

    const { mutate: chooseCommentMutate } = useMutation({
        mutationFn: apiPosts.chooseComment,
    });

    const isDog = user_type === '강아지';

    return (
        <>
            <div className="flex items-center justify-between mt-4 relative">
                <div className="flex gap-2 items-center">
                    {isDog ? <img className="" src={dog} alt="" /> : <img className="" src={parent} alt="" />}

                    <div className="font-['Pretendard-Medium'] text-[14px]">{nickname}</div>
                    <div className="text-[13px] text-gray_02">{isDog ? '강아지회원' : '엄빠회원'}</div>
                </div>
                {loggedUserId === user_id && (
                    <img onClick={() => setModalOpen(!modalOpen)} className="cursor-pointer" src={commentdot} alt="" />
                )}
                {modalOpen && (
                    <ModalComment
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        commentInfo={commentInfo}
                        post_id={post_id}
                    />
                )}
            </div>

            <div className="flex flex-col py-4">
                <div className="whitespace-pre-wrap text-[15px]">{comment}</div>
                {image && <img className="w-14 h-14 rounded-lg object-cover mt-4" src={image} alt="" />}
                <div className="mt-4 flex justify-between items-center">
                    <div className=" text-gray_02 text-[13px]">{formatAgo(created_at, 'ko')}</div>
                    <div className="flex items-center">
                        <div
                            onClick={() => {
                                chooseCommentMutate({ post_id, comment_id, cookies });
                            }}
                        >
                            {chosen == 1 ? (
                                <div className="inline-flex text-[11px] px-2 py-1 rounded-3xl bg-white text-primary border border-primary mr-3 cursor-pointer">
                                    채택된 답변
                                </div>
                            ) : loggedUserId == userIdPost ? (
                                <div className="inline-flex text-[11px] px-2 py-1 rounded-2xl bg-white text-gray_01 border border-gray_01 mr-3 cursor-pointer">
                                    채택하기
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => {
                                updateCommentLikeMutate({ userIdPost, comment_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={like_check ? likeActive : like} alt="" />
                            {like_num}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
