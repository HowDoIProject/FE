import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import comment from '../assets/icon/comment.svg';
import { formatAgo } from '../util/date';
import { useCookies } from 'react-cookie';
import likeActive from '../assets/icon/likeActive.svg';
import scrapActive from '../assets/icon/scrapActive.svg';
import { apiPosts } from '../shared/Api';
import { useNavigate } from 'react-router-dom';

export default function ScrapListCard({ scrap }) {
    const { category, title, like_num, scrap_num, post_id, user_type, comment_num, created_at, user_id } = scrap;

    //scrap 으로 변경
    //삭제를 하면 모든 게시물이 삭제되는 점이 있음
    //개선 해야할 점 ---> 개선 완료 (2023.07.21)

    const [cookies] = useCookies(['accessToken']);

    const queryClient = useQueryClient();
    //좋아요를 클릭시 업데이트 되는 함수
    const { mutate: updateLikeMutate } = useMutation(apiPosts.updatePostLike, {
        onSuccess: () => {
            queryClient.invalidateQueries('scraps');
        },
    });
    //스크랩을  클릭시 업데이트 되는 함수
    const { mutate: updateScrapMutate } = useMutation(apiPosts.updatePostScrap, {
        onSuccess: () => {
            queryClient.invalidateQueries('scraps');
        },
    });

    const isDog = user_type === '강아지';
    const navigate = useNavigate();

    return (
        <>
            <div
                onClick={() => {
                    cookies.accessToken ? navigate(`/post/${post_id}`) : navigate('/login');
                }}
                className="w-full h-full justify-between rounded-xl bg-gray_05 p-3 shadow-button"
            >
                <div className="flex mb-4">
                    <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1">
                        {/** 카테고리를 표시합니다. */}
                        {category}
                    </div>
                    <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
                        {/** 질문글과, 꿀팁글을 표시합니다. */}
                        {isDog ? '질문글' : '꿀팁글'}
                    </div>
                </div>
                <h1 className="line-clamp-2 w-[356px] h-12 mb-3 text-[15px]">{title}</h1>
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-6 text-[14px] items-center">
                        {/** 좋아요, 스크랩, 댓글을 표시합니다. */}
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                updateLikeMutate({ user_id, post_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={likeActive} alt="" />
                            {like_num}
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={e => {
                                e.stopPropagation();
                                updateScrapMutate({ user_id, post_id, cookies });
                            }}
                        >
                            <img className="w-4 h-4" src={scrapActive} alt="" />
                            {scrap_num}
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="h-4 w-4" src={comment} alt="" />
                            {comment_num}
                        </div>
                    </div>
                    <div className="text-[14px] text-gray_02">{formatAgo(created_at, 'ko')}</div>
                </div>{' '}
            </div>
        </>
    );
}
// import React from 'react';

// export default function ScrapListCard({ scrap, user_type }) {
//     const { category, title, like_num, scrap_num, comment_num, created_at } = scrap;
//     const isDog = user_type === '강아지';
//     return (
//         <div className="w-full h-full justify-between rounded-xl bg-gray_05 p-3 shadow-button">
//             <div className="flex mb-4">
//                 <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1">
//                     {category}
//                 </div>
//                 <div className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02">
//                     {isDog ? 'Question' : 'Tips'}
//                 </div>
//             </div>
//             <h1 className="line-clamp-2 w-[356px] h-12 mb-3 text-[15px]">{title}</h1>
//             <div className="flex justify-between items-center">
//                 <div className="flex flex-row gap-6 text-[14px] items-center">
//                     <div className="flex items-center gap-1">{like_num}</div>
//                     <div className="flex items-center gap-1">{scrap_num}</div>
//                     <div className="flex items-center gap-1">{comment_num}</div>
//                 </div>
//                 <div className="text-[14px] text-gray_02">{created_at}</div>
//             </div>
//         </div>
//     );
// }
