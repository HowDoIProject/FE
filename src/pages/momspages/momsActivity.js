import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import image2 from '../../assets/icon/mom_dog.svg';

const MomsActivity = () => {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};

    const [activeSection, setActiveSection] = useState('posts');

    const [articles, setArticles] = useState([]);
    const [filter, setFilter] = useState('today');

    const handleFileChange = event => {
        const file = event.target.files[0];
        // setSelectedFile(file);
        setFilter('1month');
    };

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`/api/articles?filter=${filter}`);
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleSectionChange = async section => {
        try {
            if (section === 'posts') {
                const response = await axios.get('/api/posts');
                // Handle the response for posts section
            } else if (section === 'comments') {
                const response = await axios.get('/api/comments');
                // Handle the response for comments section
            } else if (section === 'selectedpost') {
                const response = await axios.get('/api/selectedposts');
                // Handle the response for selected posts section
            }

            setActiveSection(section);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [filter]);

    const handleFilterChange = newFilter => {
        setFilter(newFilter);
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg ">
            <div className="flex flex-col items-start p-4">
                <div className="ml-60 w-16 h-16 bg-white rounded-md shadow-md">
                    <div>
                        <img src={image2} />
                    </div>
                </div>
                <div>
                    <h1>안녕하세요!</h1>
                    <h1>
                        {nickname && nickname.nickname}
                        {user_type && ` ${user_type.user_type}`}님
                    </h1>
                </div>

                <div className="mt-4 w-full">
                    <div className="graph">
                        <div className="graph-bar bg-blue-500" style={{ width: '60%' }}>
                            <div className="graph-label">내가 쓴 답 </div>
                        </div>
                        <div className="graph-bar bg-green-500" style={{ width: '30%' }}>
                            <div className="graph-label">도웁 됬어요 </div>
                        </div>
                        <div className="graph-bar bg-green-800" style={{ width: '70%' }}>
                            <div className="graph-label">게시글</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <div className="flex justify-center">
                        <button
                            className={`mr-2 px-4 py-2 rounded ${
                                activeSection === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleSectionChange('posts')}
                        >
                            내 가 쓴글
                        </button>
                        <button
                            className={`mr-2 px-4 py-2 rounded ${
                                activeSection === 'comments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleSectionChange('comments')}
                        >
                            내 댓글
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                activeSection === 'selectedpost'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleSectionChange('selectedpost')}
                        >
                            내 채택글
                        </button>
                    </div>

                    <div className="mt-4">
                        <button
                            className={`mr-2 px-4 py-2 rounded ${
                                filter === '오늘' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleFilterChange('오늘')}
                        >
                            오늘
                        </button>
                        <button
                            className={`mr-2 px-4 py-2 rounded ${
                                filter === '1개월' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleFilterChange('1개월')}
                        >
                            1 개월
                        </button>
                        <button
                            className={`mr-2 px-4 py-2 rounded ${
                                filter === '3개월' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleFilterChange('3개월')}
                        >
                            3 개월
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                filter === '6개월' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                            onClick={() => handleFilterChange('6개월')}
                        >
                            6 개월
                        </button>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mt-4">
                        {articles.map(article => (
                            <div key={article.id}>
                                <h3>{article.title}</h3>
                                <p>{article.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 
                {activeSection === 'posts' && <MyPosts />}
                {activeSection === 'comments' && <MyComments />}
                {activeSection === 'adoption' && <MyAdoption />} */}
            </div>

            <div className="flex mt-4">
                <div className="graph-legend">
                    <div className="legend-item">
                        <div className="legend-color bg-blue-500"></div>
                        <div className="legend-text">What I Wrote</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color bg-green-500"></div>
                        <div className="legend-text">Adopted Article</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color bg-yellow-500"></div>
                        <div className="legend-text">My Post</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MomsActivity;
