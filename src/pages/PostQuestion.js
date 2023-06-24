import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostQuestion() {
    const [values, setValues] = useState({
        category: '',
        title: '',
        content: '',
        image: '',
    });
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const categories = [
        { id: 1, name: '사회생활' },
        { id: 2, name: '자취/일상' },
        { id: 3, name: '재테크/자산' },
    ];

    const queryClient = useQueryClient();

    const newPostMutation = useMutation({
        mutationFn: async payload => {
            return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/post`, payload, {
                headers: {
                    // Authorization: ``,
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            alert('게시글이 등록되었습니다!');
            queryClient.invalidateQueries(['posts']);
            navigate('/');
        },
    });

    const onChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const onChangeFileHandler = e => {
        const file = e.target.files[0];
        setValues(prev => ({ ...prev, image: file }));
        setFile(URL.createObjectURL(file));
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', values.category);
        formData.append('title', values.title);
        formData.append('content', values.content);

        if (values.image) {
            formData.append('image', values.image);
        }

        // FormData의 key와 value 확인
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        newPostMutation.mutate(formData);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <span>카테고리를 선택해주세요(중복선택 불가)</span>
                {categories.map(item => (
                    <div key={item.id}>
                        <input type="radio" id={item.id} name="category" value={item.name} onChange={onChange} />
                        <label htmlFor={item.id}>{item.name}</label>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    name="title"
                    value={values.title}
                    placeholder="제목을 입력해주세요"
                    id="title"
                    onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="content">질문 내용</label>
                <input
                    type="text"
                    name="content"
                    value={values.content}
                    placeholder="나의 고민을 이야기해주세요"
                    id="content"
                    onChange={onChange}
                />
            </div>
            <div>
                <input type="file" accept="image/*" name="image" onChange={onChangeFileHandler} />
                {file && <img src={file} alt={file} />}
            </div>
            <button>도움 요청하기</button>
        </form>
    );
}
