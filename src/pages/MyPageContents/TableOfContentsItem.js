import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

export const TableOfContentsItem = ({ title, onClick, isActive }) => {
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
