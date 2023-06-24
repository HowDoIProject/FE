import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../shared/Api';

export default function Login() {
    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['verification']);
    const navigate = useNavigate();

    const handleUserNumberChange = event => {
        setUserNumber(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (userNumber && password) {
            alert('Log in!');

            try {
                //instance 사용해 구현
                const response = await AuthApi.login({
                    user_number: userNumber,
                    password: password,
                });

                if (response.status === 200) {
                    const { access } = response.data;

                    setCookie('verification', access, { path: '/', secure: true });
                    navigate('/', { state: { userNumber: userNumber } });
                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_number">
                        User Number:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="user_number"
                        value={userNumber}
                        onChange={handleUserNumberChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        type="submit"
                    >
                        로그인하기
                    </button>
                </div>
            </form>
        </div>
    );
}
