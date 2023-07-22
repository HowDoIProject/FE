import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { apiPosts } from '../shared/Api';
import image1 from '../assets/icon/camera.svg';
import image2 from '../assets/icon/delete.svg';

export default function EditPostForm() {
    const { post_id } = useParams();
    const {
        state: { post },
    } = useLocation();

    const { category, title, content, image } = post;

    const [values, setValues] = useState({
        category: category,
        title: title,
        content: content,
        image: '',
    });
    const [file, setFile] = useState(image);

    console.log('editpost', post);
    console.log('values', values);

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
        if (values.category.trim().length === 0) {
            e.preventDefault();
            alert('카테고리를 선택해주세요😊');
            return;
        } else if (values.title.trim().length === 0) {
            e.preventDefault();
            alert('제목을 입력해주세요😊');
            return;
        } else if (values.content.trim().length === 0) {
            e.preventDefault();
            alert('내용을 입력해주세요😊');
            return;
        } else {
            e.preventDefault();
            apiPosts.updatePost(values, post_id, cookies, setValues, setFile, navigate);
        }
    };

    const isActive = values.category && values.title && values.content;

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={onSubmitHandler}>
                <div className="mb-4">
                    <h1 className="font-['Pretendard-Bold'] mt-6 mb-1 text-[15px]">
                        카테고리를 선택해주세요 (중복선택 불가)
                    </h1>
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
                                <label
                                    className={
                                        values.category === item.name
                                            ? `text-[12px] border text-white bg-primary border-primary px-3 py-1 rounded-xl`
                                            : `text-[12px] border text-primary bg-white border-primary px-3 py-1 rounded-xl`
                                    }
                                    htmlFor={item.id}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-1 font-['Pretendard-Bold'] text-[15px]" htmlFor="title">
                        제목
                    </label>
                    <textarea
                        className="w-[320px] h-[44px] p-2 border rounded-lg border-gray_03 text-[15px]"
                        type="text"
                        name="title"
                        value={values.title}
                        placeholder="제목을 입력해주세요"
                        id="title"
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-1 font-['Pretendard-Bold'] text-[15px]" htmlFor="content">
                        질문 내용
                    </label>
                    <textarea
                        className="w-[320px] h-[288px] p-2 border rounded-lg border-gray_03 text-[15px]"
                        type="text"
                        name="content"
                        value={values.content}
                        placeholder="자취와 관련된 나의 고민을 이야기해주세요!&#13;&#10;상세히 적을수록 더욱 도움이 되는 답변을 얻을 수 있어요."
                        id="content"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-8">
                    <div className="mb-1 font-['Pretendard-Bold'] text-[15px]">사진첨부</div>
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
                <button
                    className={
                        isActive
                            ? `flex w-[320px] h-[44px] text-white bg-primary rounded-xl justify-center items-center mb-4`
                            : `flex w-[320px] h-[44px] text-white bg-gray_03 rounded-xl justify-center items-center mb-4`
                    }
                >
                    등록
                </button>
            </form>
        </div>
    );
}
