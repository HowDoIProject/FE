import React from 'react';
import { useCookies } from 'react-cookie';
import { api, apiPosts } from '../shared/Api';

export default function ModalComment({ commentInfo, post_id }) {
    const { comment_id } = commentInfo;
    const [cookies] = useCookies(['accessToken']);

    return (
        <div className="w-20 h-auto top-0 right-0 z-50 p-2 absolute rounded-2xl divide-y divide-gray_03 bg-white shadow-mainbox">
            <div className="flex items-center justify-center py-1">수정</div>
            <div
                onClick={() => apiPosts.deleteComment(post_id, comment_id, cookies)}
                className="flex items-center justify-center py-1 cursor-pointer"
            >
                삭제
            </div>
        </div>
    );
}
