import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Login() {
    const navigate = useNavigate();
    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['verification-token']);

    const handleUserNumberChange = event => {
        setUserNumber(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post('http://3.34.191.171/api/login', {
                user_number: userNumber,
                password: password,
            });

            // Get the token from the response
            const token = response.data.Authorization.replace('Bearer ', '');

            // Set the token as a cookie
            setCookie('verification-token', token, { path: '/' });

            // Redirect to the next page after successful login
            navigate('/', { state: { userNumber: response.data.user_number } });
        } catch (error) {
            console.error('Login failed:', error);
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
            <div className="flex items-center justify-between"></div>
        </div>
    );
}
