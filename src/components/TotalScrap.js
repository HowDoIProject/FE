import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ScrapListCard from './ScrapListCard';
import { useCookies } from 'react-cookie';
import { apiGet } from '../shared/Api';

export default function TotalScraps({ data, category, setCategory, filter, setFilter, page }) {
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

    {
        /*스크랩 카드를 만들어 냅니다 */
    }
    const renderscrap = () => {
        if (!data || data.pages.length === 0) {
            return <div className="mt-40">스크랩 한 글이 없습니다.</div>;
        }
        console.log('data', data);
        return data.pages.map(page => (
            <div key={uuidv4()}>
                {page.data.mypage.map(scrap => (
                    <div key={uuidv4()} className="w-full h-auto my-4 cursor-pointer">
                        <ScrapListCard scrap={scrap} ategory={category} filter={filter} />
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <>
            {/* 카테고리를 표시합니다. */}
            <div className="flex mt-4">
                {categoryList.map(item => (
                    <div
                        onClick={() => {
                            setCategory(item.id);
                            apiGet.getScrap(filter, category, page, cookies);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
                {/* 질문글과, 꿀팁글 */}
                {filterList.map(item => (
                    <div
                        onClick={() => {
                            setFilter(item.id);
                            apiGet.getScrap(filter, category, page, cookies);
                        }}
                        key={item.id}
                        className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02 mr-1 cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {renderscrap()}
        </>
    );
}

// TotalScraps component
// TotalScraps component

// import React, { useState, useEffect } from 'react';
// import ScrapListCard from './ScrapListCard';
// import { apiGet } from '../shared/Api';
// import { useCookies } from 'react-cookie';

// export default function TotalScraps({ category, setCategory, filter, setFilter, page }) {
//     const filterList = [
//         { id: 1, name: '질문글' },
//         { id: 2, name: '꿀팁글' },
//     ];
//     const categoryList = [
//         { id: 1, name: '생활비' },
//         { id: 2, name: '자취끼니' },
//         { id: 3, name: '집안일' },
//     ];
//     const [cookies] = useCookies(['accessToken']);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         fetchData();
//     }, [category, setCategory, filter, setFilter, page]);

//     const fetchData = async () => {
//         try {
//             const scrapsData = await apiGet.getScrap(filter, category, page, cookies);
//             setData(scrapsData);
//         } catch (error) {
//             console.error('Failed to fetch scraps:', error);
//         }
//     };

//     const renderScraps = () => {
//         if (!data || data.pages.length === 0) {
//             return <div className="mt-40">There are no scraps.</div>;
//         }

//         return data.pages.map(page => (
//             <div key={page.id}>
//                 {page.data.mypage.map(scrap => (
//                     <div key={scrap.id} className="w-full h-auto my-4 cursor-pointer">
//                         <ScrapListCard scrap={scrap} />
//                     </div>
//                 ))}
//             </div>
//         ));
//     };

//     return <>{renderScraps()}</>;
// }
