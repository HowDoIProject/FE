import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const CommentEditDeleteSelectWindow = ({ post_id, comment_id, setCommentData, setFilteredComments }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedComment, setUpdatedComment] = useState('');
    const [cookies] = useCookies(['accessToken']);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setUpdatedComment('');
    };

    const handleEditComment = async () => {
        const updatedData = {
            comment: updatedComment,
        };

        try {
            await axios.put(`https://howdoiapp.shop/api/post/${post_id}/comment/${comment_id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });

            toggleEditMode();
            // Update the comment data in the parent component
            setCommentData(prevData => {
                return prevData.map(comment => {
                    if (comment.comment_id === comment_id) {
                        return { ...comment, comment: updatedData.comment };
                    }
                    return comment;
                });
            });
        } catch (error) {
            console.error('An error occurred while updating the comment:', error);
        }
    };

    const handleDeleteComment = () => {
        axios
            .delete(`https://howdoiapp.shop/api/post/${post_id}/comment/${comment_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            })
            .then(response => {
                console.log('Comment successfully deleted');
                setFilteredComments(prevComments => prevComments.filter(comment => comment.comment_id !== comment_id));
            })
            .catch(error => {
                console.error('Failed to delete the comment:', error);
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
                                        onClick={handleDeleteComment}
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
                    <textarea
                        value={updatedComment}
                        onChange={e => setUpdatedComment(e.target.value)}
                        placeholder="Edit your comment..."
                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                    ></textarea>
                    <button
                        onClick={handleEditComment}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentEditDeleteSelectWindow;
