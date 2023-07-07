import React from 'react';

const FilterButton = ({ label, selected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-200 h-5 rounded-md border border flex items-center justify-center text-sm ${
                selected ? 'border bg-orange-400 text-white' : 'bg-white-200 text-orange-300 border-orange-300'
            }`}
        >
            {label}
        </button>
    );
};

export default FilterButton;
