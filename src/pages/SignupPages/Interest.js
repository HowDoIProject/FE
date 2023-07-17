import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Interest = () => {
    const location = useLocation();
    const { user_type, nickname, password, password_confirm, user_number } = location.state;
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAge, setselectedAge] = useState('');
    const [submitBtnActive, setSubmitBtnActive] = useState(false);

    const handleInterestSelection = category => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(prevCategories => prevCategories.filter(item => item !== category));
        } else {
            setSelectedCategories(prevCategories => [...prevCategories, category]);
        }
    };

    const handleGenderSelection = gender => {
        setSelectedGender(gender);
    };

    const handleAgeSelection = age => {
        setselectedAge(age);
    };

    const isInterestSelected = category => {
        return selectedCategories.includes(category);
    };

    const handleNext = () => {
        if (selectedCategories.length === 0 || !selectedGender || !selectedAge) {
            console.log('Please select at least one category, gender, and age.');
            return;
        }

        navigate('/Confirm', {
            state: {
                user_type,
                nickname,
                password,
                password_confirm,
                user_number,
                category: selectedCategories.map(String),
                gender: selectedGender,
                age: selectedAge,
            },
        });
    };

    const submitBtnActiveCheck = () => {
        if (selectedAge && selectedGender && selectedCategories.length > 0) {
            setSubmitBtnActive(true);
            console.log('submitBtnActive', submitBtnActive);
        }
    };

    const genders = [
        { id: 1, name: '여성' },
        { id: 2, name: '남성' },
    ];
    const ages = [
        { id: 3, name: '10' },
        { id: 4, name: '20' },
        { id: 5, name: '30' },
    ];
    const categories = [
        { id: 6, name: '자취끼니' },
        { id: 7, name: '생활비' },
        { id: 8, name: '집안일' },
    ];
    return (
        <>
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <div className="mx-auto font-['Pretendard-Bold']">회원가입</div>
                </div>
            </div>
            <div className="mx-auto bg-bgjoin pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen relative">
                <div className="mx-10">
                    <div className="font-['Pretendard-Bold'] mt-[60px] mb-2">관심사를 선택해보세요</div>
                    <div className="text-gray_01 text-[14px] mb-[40px]">
                        선택한 정보를 토대로 게시글을 추천해드립니다
                    </div>
                    <div className="mb-[40px] w-[320px]">
                        <div className="flex font-['Pretendard-Bold'] text-[15px] mb-5">성별을 선택해주세요</div>
                        <div className="flex items-center justify-between mb-5">
                            {genders.map(item => (
                                <div key={item.id} className="">
                                    <input
                                        className="mr-1 accent-primary"
                                        type="radio"
                                        id={item.id}
                                        name="gender"
                                        value={item.name}
                                        onChange={() => handleGenderSelection(item.name)}
                                        onKeyUp={submitBtnActiveCheck}
                                        required
                                    />
                                    <label
                                        className={
                                            selectedGender === item.name
                                                ? `text-[14px] border text-white bg-primary border-primary px-[64px] py-3 w-full rounded-2xl cursor-pointer`
                                                : `text-[14px] border text-primary bg-white border-primary px-[64px] py-3 w-full rounded-2xl cursor-pointer`
                                        }
                                        htmlFor={item.id}
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-[40px] w-[320px]">
                        <div className="flex font-['Pretendard-Bold'] text-[15px] mb-5 mt-5">나이를 선택해주세요</div>
                        <div className="flex items-center justify-between">
                            {ages.map(item => (
                                <div key={item.id} className="">
                                    <input
                                        className="mr-1 accent-primary"
                                        type="radio"
                                        id={item.id}
                                        name="age"
                                        value={item.name}
                                        onChange={() => handleAgeSelection(item.name)}
                                        onKeyUp={submitBtnActiveCheck}
                                        required
                                    />
                                    <label
                                        className={
                                            selectedAge === item.name
                                                ? `text-[14px] border text-white bg-primary border-primary px-10 py-3 w-full rounded-2xl cursor-pointer`
                                                : `text-[14px] border text-primary bg-white border-primary px-10 py-3 w-full rounded-2xl cursor-pointer`
                                        }
                                        htmlFor={item.id}
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-[100px] w-[320px]">
                        <div className="flex font-['Pretendard-Bold'] text-[15px] mb-5 mt-5">
                            얻고 싶은 자취 정보는 무엇인가요? (중복선택 가능)
                        </div>
                        <div className="flex items-center justify-between">
                            {categories.map(item => (
                                <div key={item.id}>
                                    <input
                                        className="mr-1 accent-primary"
                                        type="radio"
                                        id={item.id}
                                        name="category"
                                        value={item.name}
                                        onChange={() => handleInterestSelection(item.name)}
                                        onKeyUp={submitBtnActiveCheck}
                                        required
                                    />
                                    <label
                                        className={
                                            isInterestSelected(item.name)
                                                ? `text-[14px] border text-white bg-primary border-primary px-7 py-3 w-full rounded-2xl cursor-pointer`
                                                : `text-[14px] border text-primary bg-white border-primary px-7 py-3 w-full rounded-2xl cursor-pointer`
                                        }
                                        htmlFor={item.id}
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleNext}
                        type="submit"
                        className={
                            submitBtnActive
                                ? `flex w-[320px] h-[44px] text-white bg-primary rounded-xl justify-center items-center mb-4`
                                : `flex w-[320px] h-[44px] text-white bg-gray_03 rounded-xl justify-center items-center mb-4`
                        }
                    >
                        다음으로
                    </button>
                </div>
            </div>
        </>
    );
};

export default Interest;
