import React, { useState, useRef } from 'react';
import search from '../assets/icon/search.svg';
import scrap from '../assets/icon/scrap.svg';
import notif from '../assets/icon/notif.svg';
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchBar() {
    const [text, setText] = useState('');
    const { keyword } = useParams();
    const navigate = useNavigate();
    const onSubmitHandler = e => {
        e.preventDefault();
        navigate(`/posts/${text}`);
    };

    return (
        <div className="flex justify-between items-center p-5 mb-6 bg-white rounded-es-[20px] rounded-ee-[20px] shadow-searchbar">
            <form onSubmit={onSubmitHandler}>
                <input
                    className="h-7 p-2 rounded-full text-[14px] text-gray_02"
                    id="search"
                    type="text"
                    value={text}
                    placeholder="검색어를 입력해주세요"
                    onChange={e => setText(e.target.value)}
                />
            </form>
            <div className="flex gap-3">
                <img src={scrap} alt="" className="w-6 h-6" />
                <img src={notif} alt="" className="w-6 h-6" />
            </div>
        </div>
    );
}
