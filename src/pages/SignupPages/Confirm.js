import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import 'tailwindcss/tailwind.css';
// import { getCookie } from '../../shared/Cookie';

const Confirm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        user_type,
        user_number,
        nickname,
        password,
        password_confirm,
        category: selectedCategories,
    } = location.state;
    console.log(user_type, user_number, nickname, password, password_confirm, { category: selectedCategories });
    const [cookies, setCookies, removeCookies] = useCookies(['verification']);
    // const [isVerified, setIsVerified] = useState(false);
    // const [verificationError, setVerificationError] = useState(null);
    const [value, setValue] = useState({
        user_type,
        user_number,
        nickname,
        password,
        password_confirm,
        category: 123,
    });

    console.log('Received state:', {
        user_type,
        nickname,
        password,
        password_confirm,
        user_number,
        category: parseInt(selectedCategories.join(''), 10),
    });
    const handlePrevious = event => {
        event.preventDefault();
        navigate('/Interest', { state: location.state });
    };

    const handleConfirm = async () => {
        const payload = {
            user_type,
            user_number,
            nickname,
            password,
            password_confirm,
            category: parseInt(selectedCategories.join(''), 10),
        };

        try {
            // const CookieValue = cookies[('verification', user_number)];
            const response = await axios.post(
                'http://3.39.252.163/api/signup',
                {
                    payload,
                },
                {
                    // withCredentials: true,
                    // headers: {
                    //     Cookie: `verification=${user_number}`, // Set the cookie in the request headers
                    // },
                    headers: {
                        verification: cookies.verification ? cookies.verification : '',
                    },
                }
            );

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleConfirm = async e => {
    //     e.preventDefault();

    //     try {
    //         // Check if validation token cookie exists.
    //         const verification = cookie['verification'];
    //         console.log(verification);

    //         if (!verification) {
    //             console.log('Verification token cookie does not exist.');
    //             // Set how to handle when validation token cookie is missing.
    //             // For example, you can display an error message or redirect to another page.
    //             return;
    //         }

    // const payload = {
    //     user_type,
    //     user_number: user_number,
    //     nickname,
    //     password,
    //     password_confirm,
    //     category: parseInt(selectedCategories.join(''), 10), // or use any category string format you want
    //             // verification: user_number, // Include the verification token in the payload
    //         };
    //         console.log(payload);

    //         // Send a POST request to the signup endpoint.
    //         axios
    //             .post('http://3.34.191.171/api/signup', payload, {
    //                 // withCredentials: true,
    //                 // headers: {
    //                 //     Verification: user_number,
    //                 // },
    //             })
    //             .then(response => {
    //                 console.log('Registration successful!');
    //                 // Handle any necessary responses.
    //                 navigate('/');
    //             })
    //             .catch(error => {
    //                 console.error('Error: Registration Failed', error);
    //                 // Handle any necessary responses.
    //             });
    //     } catch (error) {
    //         console.error('Error: Registration Failed', error);
    //         // Handle any necessary responses.
    //     }
    // };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">버튼을 누르면 완료됩니다.</h1>
            {/* <div>Render the confirmation details here</div> */}
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
};

export default Confirm;
