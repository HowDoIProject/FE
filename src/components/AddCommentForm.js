import React, { useState, useRef } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { api, apiPosts } from '../shared/Api';
import image1 from '../assets/icon/camera.svg';
import image2 from '../assets/icon/delete.svg';

export default function AddCommentForm({ post_id }) {
    const [values, setValues] = useState({
        comment: '',
        image: '',
    });
    const [file, setFile] = useState('');
    const [showFile, setShowFile] = useState(false);

    const [cookies] = useCookies(['accessToken']);

    const onChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setShowFile(true);
    };

    const onChangeFileHandler = e => {
        const { name } = e.target;
        const imgFormData = new FormData();
        const file = e.target.files[0];
        imgFormData.append(name, file);
        apiPosts.uploadImage(imgFormData, setValues, values, cookies);
        setFile(URL.createObjectURL(file));
        e.target.value = ''; //이걸 해야지 이미지 삭제 후 같은 이미지 업로드가 가능함
    };

    const onDeleteFileHandler = () => {
        setValues({ ...values, image: '' });
        setFile('');
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        apiPosts.addComment(values, post_id, cookies, setValues, setFile);
    };

    return (
        <div className="w-[360px] bg-gray_05 rounded-lg shadow-button">
            <form onSubmit={onSubmitHandler}>
                <div className="flex gap-2 p-3">
                    <textarea
                        className="h-12 w-4/5 p-2 border rounded-lg border-[#999999]"
                        type="text"
                        name="comment"
                        value={values.comment}
                        placeholder="답변을 입력해주세요"
                        id="comment"
                        onChange={onChange}
                    />
                    <button className="text-[14px] w-1/5 h-8 inline-flex px-2 py-1 bg-primary rounded-2xl justify-center items-center text-white">
                        등록
                    </button>
                </div>
                {showFile && (
                    <div className="px-3 pb-3">
                        <div className="flex gap-2">
                            <label
                                className="w-10 h-10 flex justify-center items-center cursor-pointer bg-gray_04 rounded-lg"
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
                                        <img className="w-10 h-10 rounded-lg object-cover" src={file} alt={file} />
                                        <img
                                            onClick={onDeleteFileHandler}
                                            className="w-6 h-6 absolute left-6 bottom-6 cursor-pointer"
                                            src={image2}
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
