import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import 'tailwindcss/tailwind.css';

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

    const handlePrevious = event => {
        event.preventDefault();
        navigate('/Interest', { state: location.state });
    };

    const handleConfirm = async () => {
        if (Number(verification) !== Number(user_number)) {
            setError('Sign up with a verified number.');
        }

        const selectedCategoriesArray = Array.isArray(selectedCategories) ? selectedCategories : [];

        try {
            const response = await axios.post(
                'https://howdoiapp.shop/api/signup',
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
                navigate('/login', { state: { user_type: 'user_type' } });
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">버튼을 누르면 완료됩니다.</h1>
            <div className="mt-4">
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        가입완료
                    </button>
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        이전으로가기
                    </button>
                </div>
            </div>
        </div>
    );
}
