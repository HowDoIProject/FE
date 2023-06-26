import React from 'react';

const TableOfContentsItem = ({ title, onClick }) => {
    return (
        <li>
            <button
                onClick={onClick}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none cursor-pointer"
            >
                {title}
            </button>
        </li>
    );
};

const TableOfContents = ({ onPageChange }) => {
    const handleItemClick = page => {
        onPageChange(page);
    };

    const commonItems = [
        { title: '내 활동 보기', page: 1 },
        { title: '고객센터', page: 2 },
        { title: '로그아웃', page: 3 },
    ];

    const items = commonItems;

    return (
        <ul className="py-4">
            {items.map(item => (
                <TableOfContentsItem key={item.title} title={item.title} onClick={() => handleItemClick(item.page)} />
            ))}
        </ul>
    );
};

export default TableOfContents;
