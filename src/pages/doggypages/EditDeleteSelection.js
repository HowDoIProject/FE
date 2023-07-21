import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import commentdot from '../../assets/icon/commentdot.svg';
import EditPostForm from '../../components/EditPostForm';
import { useNavigate } from 'react-router-dom';

const EditDeleteSelectWindow = ({ post, post_id, setFilteredPosts }) => {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [cookies] = useCookies(['accessToken']);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    const toggleEditMode = () => {
        navigate(`/mypage/update/${post_id}`, { state: { post } });
    };

    const handleDelete = async () => {
        try {
            await axios
                .delete(`https://howdoiapp.shop/api/mypage/${post_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        access: `${cookies.accessToken}`,
                    },
                })
                .then(res => {
                    alert('글이 삭제되었습니다.');
                });
            // Remove the deleted post from the filteredPosts state
            setFilteredPosts(prevPosts => prevPosts.filter(post => post.post_id !== post_id));
            console.log('Post successfully deleted');
        } catch (error) {
            console.error('Failed to delete the post:', error);
        }
    };

    return (
        <div>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="p-3 rounded-full hover:bg-gray-200 focus:outline-none"
                    onClick={toggleOptions}
                >
                    <img src={commentdot} alt="" />
                </button>
                {showOptions && (
                    <div className="absolute right-3 mt-2 flex bg-white shadow-button flex-col text-[15px] w-[72px] rounded-2xl px-2">
                        <button type="button" className="border-b border-gray_04 py-2 px-1" onClick={toggleEditMode}>
                            수정
                        </button>
                        <button type="button" className="border-b border-gray_04 py-2 px-1" onClick={handleDelete}>
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default EditDeleteSelectWindow;
