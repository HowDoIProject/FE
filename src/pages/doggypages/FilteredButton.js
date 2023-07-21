import React from 'react';

const FilterButton = ({ label, selected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`text-[12px] inline-flex rounded-2xl border px-3 py-1 cursor-pointer font-['Pretendard-Medium'] ${
                selected ? 'border-primary bg-primary text-white' : 'bg-white-200 text-orange-300 border-orange-300'
            }`}
        >
            {label}
        </button>
    );
};

export default FilterButton;
