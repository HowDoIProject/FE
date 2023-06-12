import React, { useState } from 'react';

const UserInfo = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNicknameChange = event => {
        setNickname(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };

    const validateNickname = nickname => {
        // Regular expression for nickname validation
        const nicknameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
        return nicknameRegex.test(nickname);
    };

    const validatePassword = password => {
        // Regular expression for password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateForm = () => {
        // Perform form validation here
        const isNicknameValid = validateNickname(nickname);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = password === confirmPassword;

        return isNicknameValid && isPasswordValid && isConfirmPasswordValid;
    };

    const handlePrevious = event => {
        event.preventDefault();
        // Handle previous button click event
        console.log('Previous button clicked');
    };

    const handleNext = event => {
        event.preventDefault();
        if (validateForm()) {
            // Process the registration data here
            console.log('Registration successful');
            // Add your registration logic here
        } else {
            console.log('Invalid registration data');
            // Display error messages or handle invalid data case
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center">
                <form className="max-w-sm p-4">
                    <h2 className="text-center mb-4">아이디 & 닉네임 설정</h2>
                    <div className="mb-4">
                        <label htmlFor="nickname" className="block text-gray-700 font-bold mb-2">
                            아이디(닉네임)
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={handleNicknameChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-between mt-4">
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
                </form>
            </div>
            <footer className="bg-gray-500 px-4 py-6 text-white">
                <div className="flex justify-between">
                    <a href="/" className="text-white text-sm no-underline hover:text-decoration-underline">
                        Home
                    </a>
                    <a href="/PostQuestion" className="text-white text-sm no-underline hover:text-decoration-underline">
                        Upload post
                    </a>
                    <a href="/ScrapList" className="text-white text-sm no-underline hover:text-decoration-underline">
                        Scrap
                    </a>
                    <a href="/MyPage" className="text-white text-sm no-underline hover:text-decoration-underline">
                        My Page
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default UserInfo;
