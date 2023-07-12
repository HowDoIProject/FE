import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiGet } from '../shared/Api';
import PostListCard from './PostListCard';

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
    return (
        <>
            <div className="flex mt-4">
                {categoryList.map(item => (
                    <div
                        onClick={() => {
                            setCategory(item.id);
                            apiGet.getScrapFilterAndCategory(filter, category, page);
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
                            apiGet.getScrapFilterAndCategory(filter, category, page);
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
                        <div className="mt-40">검색 조건에 맞는 글이 없습니다아아아아</div>
                    )}
                </div>
            ))}
        </>
    );
}

// import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { apiGet } from '../shared/Api';

// export default function TotalPosts({ data, category, setCategory, filter, setFilter, page }) {
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

//     const fetchData = async (category, filter, page) => {
//         try {
//             const accessToken = cookies?.accessToken;
//             if (!accessToken) {
//                 console.log('Access token is missing.');
//                 return;
//             }

//             const response = await axios.post(`/api/scrap/${filter}/${category}/${page}`, {
//                 headers: {
//                     access: cookies.accessToken,
//                 },
//             });

//             console.log('scrapPost', response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <div className="flex mt-4">
//                 {categoryList.map(item => (
//                     <div
//                         onClick={() => {
//                             setCategory(item.id);
//                             apiGet.getScrapFilterAndCategory(filter, category, page);
//                         }}
//                         key={item.id}
//                         className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-primary mr-1 cursor-pointer"
//                     >
//                         {item.name}
//                     </div>
//                 ))}
//                 {filterList.map(item => (
//                     <div
//                         onClick={() => {
//                             setFilter(item.id);
//                             apiGet.getScrapFilterAndCategory(filter, category, page);
//                         }}
//                         key={item.id}
//                         className="inline-flex text-white text-[11px] px-3 py-1 rounded-2xl bg-gray_02 mr-1 cursor-pointer"
//                     >
//                         {item.name}
//                     </div>
//                 ))}
//             </div>
//             {data?.pages.map(page => (
//                 <div key={uuidv4()}>
//                     {page?.data.map(scrap => (
//                         <div key={scrap.post_id} className="w-full h-auto my-4 cursor-pointer">
//                             <div>{scrap.title}</div>
//                             <div>{scrap.content}</div>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </>
//     );
// }
