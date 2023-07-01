import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

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

    // const queryClient = useQueryClient();

    // const newPostMutation = useMutation({
    //     mutationFn: async payload => {
    //         return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/post`, payload, {
    //             headers: {
    //                 Authorization: cookies.verification,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //     },
    //     onSuccess: () => {
    //         alert('게시글이 등록되었습니다!');
    //         queryClient.invalidateQueries(['posts']);
    //         navigate('/');
    //     },
    // });

    const onChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    // const onChangeFileHandler = e => {
    //     const file = e.target.files[0];
    //     setValues(prev => ({ ...prev, image: file }));
    //     setFile(URL.createObjectURL(file));
    // };

    const onChangeFileHandler = e => {
        const { name } = e.target;
        const imgFormData = new FormData();
        const file = e.target.files[0];
        imgFormData.append(name, file);
        axios
            .post(`https://howdoiapp.shop/api/uploads`, imgFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    access: cookies.accessToken,
                },
            })
            .then(res => setValues({ ...values, image: res.data.url }))
            .catch(e => {
                console.log(e);
            });

        setFile(URL.createObjectURL(file));
    };

    // const onSubmitHandler = e => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('category', values.category);
    //     formData.append('title', values.title);
    //     formData.append('content', values.content);

    //     if (values.image) {
    //         formData.append('image', values.image);
    //     }

    //     // FormData의 key와 value 확인
    //     for (let [key, value] of formData.entries()) {
    //         console.log(key, value);
    //     }
    //     newPostMutation.mutate(formData);
    // };

    const onSubmitHandler = e => {
        e.preventDefault();
        axios
            .post(`https://howdoiapp.shop/api/post`, values, {
                headers: {
                    access: cookies.accessToken,
                },
            })
            .then(res => {
                alert('글이 등록되었습니다');
                navigate('/');
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <h1 className="mt-8 mb-3">카테고리를 선택해주세요(중복선택 불가)</h1>
                {categories.map(item => (
                    <div className="flex" key={item.id}>
                        <input type="radio" id={item.id} name="category" value={item.name} onChange={onChange} />
                        <label htmlFor={item.id}>{item.name}</label>
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                <label htmlFor="title">제목</label>
                <input
                    className="w-[319px] h-[44px] border-2 rounded-lg border-[#999999]"
                    type="text"
                    name="title"
                    value={values.title}
                    placeholder="제목을 입력해주세요"
                    id="title"
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="content">질문 내용</label>
                <input
                    className="w-[319px] h-[288px] border-2 rounded-lg border-[#999999]"
                    type="text"
                    name="content"
                    value={values.content}
                    placeholder="자취와 관련된 나의 고민을 이야기해주세요! 상세히 적을수록 더욱 도움이 되는 답변을 얻을 수 있어요."
                    id="content"
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-col">
                <span>사진 첨부</span>
                <input type="file" accept="image/*" name="image" onChange={onChangeFileHandler} />
                {file && <img src={file} alt={file} />}
            </div>
            <button>엄빠에게 도움 요청하기</button>
        </form>
    );
}
