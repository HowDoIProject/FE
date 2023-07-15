import React from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import PostListCard from './PostListCard';
import noresult from '../assets/icon/noresult.svg';
import { useNavigate } from 'react-router-dom';

export default function TotalPosts({ data, category, setCategory, filter, setFilter, page }) {
    const filterList = [
        { id: 1, name: '질문글' },
        { id: 2, name: '꿀팁글' },
    ];
    const categoryList = [
        { id: 1, name: '생활비' },
        { id: 2, name: '자취끼니' },
        { id: 3, name: '집안일' },
    ];
    const [cookies] = useCookies(['accessToken']);
    const navigate = useNavigate();
    return (
        <>
            <div className="flex mt-4">
                {categoryList.map(item => (
                    <div
                        onClick={() => {
                            setCategory(item.id);
                            apiPosts.getByFilterAndCategory(filter, category, page, cookies);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
                {filterList.map(item => (
                    <div
                        onClick={() => {
                            setFilter(item.id);
                            apiPosts.getByFilterAndCategory(filter, category, page, cookies);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02 mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {data?.pages.map(page => (
                <div key={uuidv4()}>
                    {page.data.mypage && page.data.mypage.length > 0 ? (
                        page.data.mypage.map(post => (
                            <div key={uuidv4()} className="w-full h-auto my-4 cursor-pointer">
                                <PostListCard post={post} />
                            </div>
                        ))
                    ) : (
                        <div className="mt-40 flex flex-col items-center justify-center gap-8">
                            <img className="w-20" src={noresult} alt="" />
                            <div className="font-['Pretendard-Bold'] text-gray_01 text-[18px]">
                                검색 조건에 맞는 글이 없습니다
                            </div>
                            <div
                                className="px-3 py-2 rounded-3xl bg-gray_03 text-white text-[14px] cursor-pointer"
                                onClick={() => navigate('/')}
                            >
                                메인으로
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
