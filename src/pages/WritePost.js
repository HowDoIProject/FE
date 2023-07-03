import React, { useState, useRef } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { api, apiPosts } from '../shared/Api';
import image1 from '../assets/icon/camera.svg';
import image2 from '../assets/icon/delete.svg';

export default function WritePost() {
    const [values, setValues] = useState({
        category: '',
        title: '',
        content: '',
        image: '',
    });
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const categories = [
        { id: 1, name: '생활비' },
        { id: 2, name: '자취끼니' },
        { id: 3, name: '집안일' },
    ];

    const [cookies] = useCookies(['accessToken']);

    const onChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
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
        console.log('삭제', values);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        apiPosts.addPost(values, cookies, navigate);
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <h1 className="mt-4 mb-2">카테고리를 선택해주세요 (중복선택 불가)</h1>
                    <div className="flex gap-3">
                        {categories.map(item => (
                            <div key={item.id}>
                                <input
                                    className="mr-1 accent-primary"
                                    type="radio"
                                    id={item.id}
                                    name="category"
                                    value={item.name}
                                    onChange={onChange}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="title">
                        제목
                    </label>
                    <textarea
                        className="w-[320px] h-[44px] p-2 border rounded-lg border-[#999999]"
                        type="text"
                        name="title"
                        value={values.title}
                        placeholder="제목을 입력해주세요"
                        id="title"
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="content">
                        질문 내용
                    </label>
                    <textarea
                        className="w-[320px] h-[288px] p-2 border rounded-lg border-[#999999]"
                        type="text"
                        name="content"
                        value={values.content}
                        placeholder="자취와 관련된 나의 고민을 이야기해주세요!&#13;&#10;상세히 적을수록 더욱 도움이 되는 답변을 얻을 수 있어요."
                        id="content"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-8">
                    <div className="mb-2">사진첨부</div>
                    <div className="flex gap-2">
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
                            )}
                        </div>
                    </div>
                </div>
                <button className="flex w-[320px] h-[44px] bg-primary rounded-xl justify-center items-center">
                    엄빠에게 도움 요청하기
                </button>
            </form>
        </div>
    );
}
