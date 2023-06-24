import React from 'react';

const PageContent = ({ currentPage, user_type }) => {
    let content = null;

    const handleClick = () => {
        // Function to execute when the content is clicked
        console.log('Content clicked!');
    };

    if (user_type === '강아지') {
        if (currentPage === 1) {
            content = <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}></h1>;
        } else if (currentPage === 2) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    내 채택 내역
                </h1>
            );
        }
    } else if (user_type === '엄빠') {
        if (currentPage === 1) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    내 히스토리
                </h1>
            );
        } else if (currentPage === 2) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    내 레벨 조회
                </h1>
            );
        }
    }

    return <div>{content}</div>;
};

export default PageContent;
