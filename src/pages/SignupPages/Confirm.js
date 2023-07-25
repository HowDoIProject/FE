import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import image1 from '../../assets/icon/signupend.svg';

export default function Confirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        user_type,
        user_number,
        nickname,
        password,
        password_confirm,
        category,
        gender: selectedGender,
        age: selectedAge,
    } = location.state;

    const selectedCategories = Array.isArray(category) ? category.map(Number) : [];

    const [cookies] = useCookies(['verification']);
    const verification = cookies.verification;
    const [error, setError] = useState();

    const handleConfirm = async () => {
        if (Number(verification) !== Number(user_number)) {
            setError('Sign up with a verified number.');
        }

        const selectedCategoriesArray = Array.isArray(selectedCategories) ? selectedCategories : [];

        console.log({
            user_type,
            nickname,
            password,
            password_confirm,
            user_number,
            category: selectedCategoriesArray.join(','),
            gender: selectedGender,
            age: selectedAge,
        });

        try {
            const response = await axios.post(
                'https://api.howdoiapp.shop/api/signup',
                {
                    user_type,
                    nickname,
                    password,
                    password_confirm,
                    user_number,
                    category: selectedCategoriesArray.join(','),
                    gender: selectedGender,
                    age: selectedAge,
                },
                {
                    headers: {
                        withCredentials: true,
                        verification: verification ? verification.toString() : '',
                    },
                }
            );

            if (response.status === 201) {
                alert('회원가입이 완료되었습니다!💫');
                navigate('/');
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            alert(error.response.data.message);
            navigate('/signup');
            console.error('Signup failed:', error);
        }
    };

    return (
        <>
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <div className="mx-auto font-['Pretendard-Bold']">회원가입</div>
                </div>
            </div>
            <div className="mx-auto bg-bgjoin pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen relative">
                <div className="mx-10 flex flex-col items-center justify-center">
                    <div className="font-['Pretendard-Bold'] mt-[60px] mb-2">
                        <div>모든 자취걱정거리를 내려놓는 </div>
                        <div>고민 해결 플랫폼 하우두아이</div>
                    </div>
                    <img className="my-8" src={image1} alt="" />
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="bg-primary text-white py-4 rounded-xl w-full text-[14px] mt-[120px]"
                    >
                        가입완료
                    </button>
                </div>
            </div>
        </>
    );
}
