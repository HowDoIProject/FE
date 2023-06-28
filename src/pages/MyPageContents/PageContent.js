import React from 'react';

const PageContent = ({ currentPage, user_type }) => {
    let content = <>;</>;

    const handleClick = () => {
        // Function to execute when the content is clicked

        console.log('Content clicked!');
    };

    if (user_type === '강아지') {
        if (currentPage === 1) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    내활동 보기
                </h1>
            );
        } else if (currentPage === 2) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    고객센터연결
                </h1>
            );
        } else if (currentPage === 3) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    로그아웃
                </h1>
            );
        }
    } else if (user_type === '엄빠') {
        if (currentPage === 1) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    내활동 보기
                </h1>
            );
        } else if (currentPage === 2) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    고객센터연결
                </h1>
            );
        } else if (currentPage === 3) {
            content = (
                <h1 className="text-2xl font-semibold text-gray-800" onClick={handleClick}>
                    로그아웃
                </h1>
            );
        }
    }

    return <div>{content}</div>;
};

export default PageContent;
