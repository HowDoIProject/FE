import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const CommentEditDeleteSelectWindow = ({ post_id, comment_id, setFilteredComments, comment }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.comment);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        setUpdatedComment('');
    }, [comment]);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setUpdatedComment('');
    };

    const handleImageChange = event => {
        const file = event.target.files[0]; // Get the first selected file

        if (file) {
            setSelectedImage(file);
        }
    };

    const handleEditComment = async () => {
        const formData = new FormData();
        formData.append('comment', updatedComment);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await axios.put(
                `https://api.howdoiapp.shop/api/post/${post_id}/comment/${comment_id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        access: `${cookies.accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the comment data in the state
                setFilteredComments(prevComments => {
                    return prevComments.map(prevComment => {
                        if (prevComment.comment_id === comment_id) {
                            return { ...prevComment, comment: updatedComment };
                        }
                        return prevComment;
                    });
                });
                toggleEditMode();
            } else {
                console.error('Failed to edit the comment. Response:', response);
            }
        } catch (error) {
            console.error('An error occurred while updating the comment:', error);
        }
    };

    const handleDeleteComment = () => {
        axios
            .delete(`https://api.howdoiapp.shop/api/post/${post_id}/comment/${comment_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Comment successfully deleted');
                    setFilteredComments(prevComments =>
                        prevComments.filter(prevComment => prevComment.comment_id !== comment_id)
                    );
                } else {
                    console.error('Failed to delete the comment. Response:', response);
                }
            })
            .catch(error => {
                console.error('An error occurred while deleting the comment:', error);
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
                        placeholder="Please enter a comment."
                        className="border border-gray-300 rounded-md px-2 py-1 mt-2"
                    ></textarea>
                    <input type="file" onChange={handleImageChange} />
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
