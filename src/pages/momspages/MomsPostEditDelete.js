import React, { useState, useEffect } from 'react';
import { api, apiPosts } from '../../shared/Api';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import image1 from '../../assets/icon/camera.svg';
import image2 from '../../assets/icon/delete.svg';

const MomsPostEditDelteWindow = ({ post_id, setFilteredPosts, goBack }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    // const [data, setData] = useState();
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [updatedImage, setUpdatedImage] = useState('');
    const [cookies] = useCookies(['accessToken']);
    // const [postId, setPostId] = useState(null);
    // const [post, setPost] = useState({});
    const [updatedData, setUpdatedData] = useState(null);
    const [values, setValues] = useState({
        category: '',
        title: '',
        content: '',
        image: '',
    });
    const [file, setFile] = useState('');
    // const onDeleteFileHandler = () => {
    //     setValues({ ...values, image: '' });
    //     setFile('');
    //     console.log('삭제', values);
    // };
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const toggleEditMode = () => {
        setEditMode(!editMode);
        setUpdatedTitle('');
        setUpdatedContent('');
        setUpdatedImage('');
    };
    const handleGoBack = () => {
        toggleEditMode();
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

    // Inside handleEdit function
    const handleEdit = async () => {
        await handleEditPost(updatedTitle, updatedContent, updatedImage); // Pass the updated values as parameters

        // Update the filteredPosts state with the edited post
        setFilteredPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.post_id === post_id) {
                    return { ...post, title: updatedTitle, content: updatedContent, image: updatedImage };
                }
                return post;
            });
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://howdoiapp.shop/api/mypage/${post_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    access: `${cookies.accessToken}`,
                },
            });
            // Remove the deleted post from the filteredPosts state
            setFilteredPosts(prevPosts => prevPosts.filter(post => post.post_id !== post_id));
            console.log('Post successfully deleted');
        } catch (error) {
            console.error('Failed to delete the post:', error);
        }
    };
    // const onChangeFileHandler = e => {
    //     const { name } = e.target;
    //     const imgFormData = new FormData();
    //     const file = e.target.files[0];
    //     imgFormData.append(name, file);
    //     apiPosts.uploadImage(imgFormData, setValues, values, cookies);
    //     setFile(URL.createObjectURL(file));
    //     e.target.value = ''; //이걸 해야지 이미지 삭제 후 같은 이미지 업로드가 가능함
    // };
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
                                    <div className="absolute right-3 mt-2 flex">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 mr-2"
                                            onClick={toggleEditMode}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
                                            onClick={handleDelete}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {editMode && (
                <div className="border p-1 rounded-lg bg-gray-100">
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={e => setUpdatedTitle(e.target.value)}
                        placeholder="제목"
                        className="border border-gray-300 rounded-md px-2 py-1 mt-1"
                    />
                    <textarea
                        type="text"
                        value={updatedContent}
                        onChange={e => setUpdatedContent(e.target.value)}
                        placeholder="내용"
                        className="border border-gray-300 rounded-md px-2 py-1 mt-1"
                    ></textarea>
                    {/* <div className="mb-8"> */}
                    {/* <div className="mb-2">사진첨부</div> */}
                    {/* <div className="flex gap-2">
                            <label
                                className="w-20 h-20 flex justify-center items-center cursor-pointer bg-gray_04 rounded-lg"
                                htmlFor="image"
                            >
                                <img src={image1} alt="" />
                            </label>
                            <input
                                className="w-0 h-0 opacity-0"
                                type="file"
                                accept="image/*"
                                name="image"
                                id="image"
                                onChange={onChangeFileHandler}
                            />
                            <div>
                                {file && (
                                    <div className="relative">
                                        <img className="w-20 h-20 rounded-lg object-cover" src={file} alt={file} />
                                        <img
                                            onClick={onDeleteFileHandler}
                                            className="absolute left-14 bottom-14 cursor-pointer"
                                            src={image2}
                                            alt=""
                                        />
                                    </div>
                                )} */}
                    <button onClick={handleEdit} className="bg-green-500 text-white font-bold py-2 px-1 rounded mt-1">
                        저장
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-blue-500 text-white font-bold py-2 px-1 rounded mt-2 ml-2"
                    >
                        취소
                    </button>
                </div>
                //         </div>
                //     </div>
                // </div>
            )}
        </div>
    );
};
export default MomsPostEditDelteWindow;
