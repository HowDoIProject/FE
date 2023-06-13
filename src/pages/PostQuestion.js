import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function PostQuestion() {
    const [values, setValues] = useState({
        category: '',
        title: '',
        content: '',
        image: '',
    });

    const categories = [
        { id: 1, name: '사회생활' },
        { id: 2, name: '자취/일상' },
        { id: 3, name: '재테크/자산' },
    ];

    const queryClient = useQueryClient();

    const newPostMutation = useMutation({
        mutationFn: async values => {
            return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/post`, values, {
                headers: {
                    // Authorization: ``,
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });

    const onChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        // newPostMutation.mutate(values)
        console.log(values);
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
            <div>사진첨부</div>
            <button>도움 요청하기</button>
        </form>
    );
}
