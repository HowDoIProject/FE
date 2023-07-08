import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';

const EditDeleteSelectWindow = ({ post_id, setUpdatedData, setFilteredPosts }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // const [data, setData] = useState();
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [updatedImage, setUpdatedImage] = useState('');
    const [cookies] = useCookies(['accessToken']);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const toggleEditMode = () => {
        setEditMode(!editMode);
        setUpdatedTitle('');
        setUpdatedContent('');
        setUpdatedImage('');
    };

    const handleEditPost = async (updatedTitle, updatedContent, updatedImage) => {
        const updatedData = {
            title: updatedTitle,
            content: updatedContent,
            image: updatedImage,
        };

        try {
            await axios.put(`https://howdoiapp.shop/api/mypage/${post_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            toggleEditMode(updatedData);
            setUpdatedData(updatedData); // Set the updatedPostData in the parent component
        } catch (error) {
            console.error('An error occurred while updating the post:', error);
        }
    };
    // Inside EditDeleteSelectWindow component

    const handleEdit = () => {
        handleEditPost(updatedTitle, updatedContent, updatedImage);
        // Replace `/edit/${post_id}` with the desired edit screen path
    };

    const handleDelete = () => {
        axios
            .delete(`https://howdoiapp.shop/api/mypage/${post_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            })
            .then(response => {
                console.log('Post successfully deleted');
            })
            .catch(error => {
                console.error('Failed to delete the post:', error);
            });
    };

    return (
        <div>
            {!editMode && (
                <div className="relative inline-block">
                    <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                        onClick={toggleOptions}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-12a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                            />
                        </svg>
                    </button>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                            <ul>
                                <li>
                                    <button
                                        type="button"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={toggleEditMode}
                                    >
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {editMode && (
                <div className="border p-4 rounded-lg bg-gray-100">
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={e => setUpdatedTitle(e.target.value)}
                        placeholder="제목"
                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                    />
                    <textarea
                        type="text"
                        value={updatedContent}
                        onChange={e => setUpdatedContent(e.target.value)}
                        placeholder="내용"
                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                    ></textarea>
                    <input
                        type="text"
                        value={updatedImage}
                        onChange={e => setUpdatedImage(e.target.value)}
                        placeholder="Language URL"
                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                    />

                    <button onClick={handleEdit} className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2">
                        저장
                    </button>
                </div>
            )}
        </div>
    );
};
export default EditDeleteSelectWindow;
