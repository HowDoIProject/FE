import React, { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { api, apiPosts } from '../shared/Api';

export default function ModalComment({ commentInfo, post_id, modalOpen, setModalOpen, commentUpdateHandler }) {
    const { comment_id } = commentInfo;
    const [cookies] = useCookies(['accessToken']);
    const modalRef = useRef();

    const modalOutsideClick = e => {
        if (modalRef.current === e.target) {
            setModalOpen(!modalOpen);
        }
    };

    return (
        <>
            <div
                ref={modalRef}
                onClick={modalOutsideClick}
                className="fixed w-full h-full z-40 top-0 right-0 left-0 bottom-0 bg-main/[.35] flex items-center justify-center"
            >
                <div className="w-40 h-auto z-50 p-2 absolute rounded-2xl divide-y divide-gray_03 bg-white shadow-mainbox">
                    <div
                        onClick={commentUpdateHandler}
                        className="flex items-center justify-center py-1 cursor-pointer"
                    >
                        수정
                    </div>
                    <div
                        onClick={() => apiPosts.deleteComment(post_id, comment_id, cookies)}
                        className="flex items-center justify-center py-1 cursor-pointer"
                    >
                        삭제
                    </div>
                </div>
            </div>
        </>
    );
}
