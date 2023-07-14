// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useCookies } from 'react-cookie';
// import { faUsers, faUtensils, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// import { verificationToken } from './UserInfo';
// import 'tailwindcss/tailwind.css';
// import SignUp from './SignUp';
// import UserInfo from './UserInfo';

// const Interest = () => {
//     const location = useLocation();
//     const { user_type, nickname, password, password_confirm, user_number } = location.state;
//     const navigate = useNavigate();
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     const isInterestSelected = category => {
//         const categoryInt = parseInt(category, 10);
//         return selectedCategories.includes(categoryInt);
//     };

//     const handleInterestSelection = category => {
//         const categoryInt = parseInt(category, 10);

//         if (selectedCategories.includes(categoryInt)) {
//             setSelectedCategories(prevCategories => prevCategories.filter(item => item !== categoryInt));
//         } else {
//             setSelectedCategories(prevCategories => [...prevCategories, categoryInt]);
//         }
//     };
//     const handleConfirm = () => {
//         const selectedNumbers = selectedCategories.map(category => parseInt(category, 10));

//         console.log('category:', selectedNumbers.join(''));

//         console.log('State:', {
//             user_type,
//             nickname,
//             password,
//             password_confirm,
//             user_number,
//             category: parseInt(selectedCategories.join(''), 10),
//         });
//     };

//     const handlePrevious = event => {
//         event.preventDefault();
//         navigate('/UserInfo', { state: location.state });
//     };

//     const handleNext = () => {
//         if (selectedCategories.length === 0) {
//             console.log('최소한 하나의 카테고리를 선택해주세요.');
//             return;
//         }

//         navigate('/Confirm', {
//             state: {
//                 user_type,
//                 nickname,
//                 password,
//                 password_confirm,
//                 user_number,
//                 category: selectedCategories.map(category => parseInt(category, 10)),
//             },
//         });
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-3xl font-bold mb-8">관심사를 정해주세요</h1>
//             <div className="grid grid-cols-3 gap-4">
//                 <button
//                     className={`p-4 rounded-lg ${
//                         isInterestSelected('1') ? 'bg-blue-500' : 'bg-gray-200 hover:bg-blue-600'
//                     }`}
//                     onClick={() => handleInterestSelection('1')}
//                 >
//                     <FontAwesomeIcon icon={faUsers} className="text-white" />
//                     <span className="ml-2">Society & Human Relations</span>
//                 </button>
//                 <button
//                     className={`p-4 rounded-lg ${
//                         isInterestSelected('2') ? 'bg-green-500' : 'bg-gray-200 hover:bg-green-600'
//                     }`}
//                     onClick={() => handleInterestSelection('2')}
//                 >
//                     <FontAwesomeIcon icon={faUtensils} className="text-white" />
//                     <span className="ml-2">Life & Cooking</span>
//                 </button>
//                 <button
//                     className={`p-4 rounded-lg ${
//                         isInterestSelected('3') ? 'bg-yellow-500' : 'bg-gray-200 hover:bg-yellow-600'
//                     }`}
//                     onClick={() => handleInterestSelection('3')}
//                 >
//                     <FontAwesomeIcon icon={faMoneyBill} className="text-white" />
//                     <span className="ml-2">Rent & Finance</span>
//                 </button>
//             </div>
//             <div className="mt-4">
//                 <div className="flex justify-between mt-4">
//                     <button
//                         type="button"
//                         onClick={handleConfirm}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         확인
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handlePrevious}
//                         className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         이전
//                     </button>
//                     <button
//                         type="submit"
//                         onClick={handleNext}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         다음
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Interest;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUtensils, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const Interest = () => {
    const location = useLocation();
    const { user_type, nickname, password, password_confirm, user_number } = location.state;
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAge, setSelectedAge] = useState('');

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
        setSelectedAge(age);
    };

    const isInterestSelected = category => {
        return selectedCategories.includes(category);
    };

    const handleConfirm = () => {
        console.log('State:', {
            user_type,
            nickname,
            password,
            password_confirm,
            user_number,
            category: selectedCategories.toString(),
            gender: selectedGender,
            age: selectedAge,
        });
    };

    const handlePrevious = event => {
        event.preventDefault();
        navigate('/UserInfo', { state: location.state });
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

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">관심사를 선택해보세요</h1>
            <div className="grid grid-cols-3 gap-4">
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('자취끼니') ? 'bg-blue-500' : 'bg-gray-200 hover:bg-blue-600'
                    }`}
                    onClick={() => handleInterestSelection('자취끼니')}
                >
                    자취끼니
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('생활비') ? 'bg-green-500' : 'bg-gray-200 hover:bg-green-600'
                    }`}
                    onClick={() => handleInterestSelection('생활비')}
                >
                    생활비
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('집안일') ? 'bg-yellow-500' : 'bg-gray-200 hover:bg-yellow-600'
                    }`}
                    onClick={() => handleInterestSelection('집안일')}
                >
                    집안일
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                    className={`p-4 rounded-lg ${
                        selectedGender === '남성' ? 'bg-blue-500' : 'bg-gray-200 hover:bg-blue-600'
                    }`}
                    onClick={() => handleGenderSelection('남성')}
                >
                    Male
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        selectedGender === '여성' ? 'bg-pink-500' : 'bg-gray-200 hover:bg-pink-600'
                    }`}
                    onClick={() => handleGenderSelection('여성')}
                >
                    Female
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        selectedAge === '10s' ? 'bg-purple-500' : 'bg-gray-200 hover:bg-purple-600'
                    }`}
                    onClick={() => handleAgeSelection('10')}
                >
                    10s
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        selectedAge === '20s' ? 'bg-indigo-500' : 'bg-gray-200 hover:bg-indigo-600'
                    }`}
                    onClick={() => handleAgeSelection('20')}
                >
                    20s
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        selectedAge === '30s+' ? 'bg-red-500' : 'bg-gray-200 hover:bg-red-600'
                    }`}
                    onClick={() => handleAgeSelection('30')}
                >
                    30s+
                </button>
            </div>
            <div className="mt-4">
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        확인
                    </button>
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        이전
                    </button>
                    <button
                        type="submit"
                        onClick={handleNext}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Interest;
