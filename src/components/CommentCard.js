import React, { useState, useRef, useEffect } from 'react';
import like from '../assets/icon/like.svg';
import scrap from '../assets/icon/scrap.svg';
import comment from '../assets/icon/comment.svg';
import dog from '../assets/icon/commentdog.svg';
import parent from '../assets/icon/commentparent.svg';
import commentdot from '../assets/icon/commentdot.svg';
import { formatAgo } from '../util/date';
import ModalComment from './ModalComment';

export default function CommentCard({ commentInfo, deleteCommentMutate, updateCommentMutate, post_id }) {
    const { comment, created_at, image, nickname, user_type, comment_id } = commentInfo || {};
    const [modalOpen, setModalOpen] = useState(false);

    console.log('commentInfo', commentInfo);

    const isDog = user_type === '강아지';

    return (
        <>
            <div className="flex items-center justify-between mt-4 relative">
                <div className="flex gap-2 items-center">
                    {isDog ? <img className="" src={dog} alt="" /> : <img className="" src={parent} alt="" />}

                    <h2>{nickname}</h2>
                    <div className="text-gray_02">{isDog ? '강아지회원' : '엄빠회원'}</div>
                </div>
                <img onClick={() => setModalOpen(!modalOpen)} className="cursor-pointer" src={commentdot} alt="" />
                {modalOpen && (
                    <ModalComment
                        commentInfo={commentInfo}
                        deleteCommentMutate={deleteCommentMutate}
                        updateCommentMutate={updateCommentMutate}
                        post_id={post_id}
                    />
                )}
            </div>

            <div className="flex flex-col py-4">
                <pre className="whitespace-pre-wrap">{comment}</pre>
                {image && <img className="w-14 h-14 rounded-lg object-cover mt-4" src={image} alt="" />}
                <div className="mt-5 text-gray_02">{formatAgo(created_at, 'ko')}</div>
            </div>
        </>
    );
}
