// TableOfContents.js
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
const TableOfContentsItem = ({ title, onClick, isActive }) => {
    return (
        <li>
            <button
                onClick={onClick}
                className={`block px-4 py-2 text-gray-800 ${
                    isActive ? 'bg-gray-200' : 'hover:bg-gray-200 focus:bg-gray-200'
                } focus:outline-none flex align-items`}
            >
                <span>{title}</span>
                <IoIosArrowForward className="ml-20" />
            </button>
        </li>
    );
};

const TableOfContents = ({ onPageChange, user_type = '엄빠', currentPage }) => {
    const handleItemClick = page => {
        onPageChange(page);
    };

    const user_typeItems = {
        강아지: [
            { title: '내활동 보기', page: 1 },
            { title: '고객센터연결', page: 2 },
            { title: '로그아웃', page: 3 },
        ],
        엄빠: [
            { title: '내 히스토리', page: 1 },
            { title: '내 레벨조회', page: 2 },
            { title: '고객 센터', page: 3 },
        ],
    };

    const items = user_typeItems[user_type] || [];

    return (
        <ul className="py-4">
            {items.map(item => (
                <TableOfContentsItem
                    key={item.title}
                    title={item.title}
                    onClick={() => handleItemClick(item.page)}
                    isActive={currentPage === item.page}
                />
            ))}
        </ul>
    );
};

export default TableOfContents;
