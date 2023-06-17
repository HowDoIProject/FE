import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const RegistrationConfirmationPage = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['verification-token']);
    const navigate = useNavigate();
    const [isRegistered, setRegistered] = useState(false);

    useEffect(() => {
        const isRegistrationComplete = cookie['verification-token'];
        removeCookie('verification-token');

        if (isRegistrationComplete) {
            setRegistered(true);
        }
    }, [cookie]);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const data = {
                verification_token: cookie['verification-token'],
            };
            await axios.post('http://3.34.191.171/api/signup', data);

            setRegistered(true);
            console.log('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {!isRegistered ? (
                <form>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        가입하기
                    </button>
                </form>
            ) : (
                <div>
                    <h1>가입완료!</h1>
                    <span>성공적으로 가입이 완료되었습니다!</span>
                    <svg
                        className="h-6 w-6 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default RegistrationConfirmationPage;
