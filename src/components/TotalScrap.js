import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiPosts } from '../shared/Api';
import ScrapListCard from './ScrapListCard';
import { useCookies } from 'react-cookie';

export default function TotalScraps({ data, category, setCategory, filter, setFilter }) {
    const [cookies] = useCookies(['accessToken']);

    const filterList = [
        { id: 1, name: '질문글' },
        { id: 2, name: '꿀팁글' },
    ];
    const categoryList = [
        { id: 1, name: '생활비' },
        { id: 2, name: '자취끼니' },
        { id: 3, name: '집안일' },
    ];

    // const handleDeleteScrap = async scrap => {
    //     try {
    //         if (cookies && cookies.accessToken) {
    //             await apiPosts.DeleteScrap(scrap.filter, scrap.category, scrap.page, cookies);
    //             // Handle any necessary actions after deleting the scrap post
    //         } else {
    //             // Handle the case when accessToken is not available in cookies
    //             console.error('Access token not found in cookies');
    //         }
    //     } catch (error) {
    //         // Handle the error
    //         console.error('Error deleting scrap:', error);
    //     }
    // };

    const renderPosts = () => {
        if (!data || data.pages.length === 0) {
            return <div className="mt-40">검색 조건에 맞는 글이 없습니다.</div>;
        }

        return data.pages.map(page => (
            <div key={uuidv4()}>
                {page.data.mypage.map(scrap => (
                    <div key={uuidv4()} className="w-full h-auto my-4 cursor-pointer">
                        <ScrapListCard
                            category={category}
                            filter={filter}
                            post={scrap}
                            // onDeleteScrap={handleDeleteScrap}
                        />
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <>
            <div className="flex mt-4">
                {categoryList.map(item => (
                    <div
                        onClick={() => {
                            setCategory(item.id);
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
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02 mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {renderPosts()}
        </>
    );
}
