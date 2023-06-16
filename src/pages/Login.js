import React, { useState } from 'react';

export default function Login() {
    const [userNumber, setUserNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleUserNumberChange = event => {
        setUserNumber(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        console.log('User Number:', userNumber);
        console.log('Password:', password);
    };

    const handlePrevious = () => {
        // Logic for previous button click
    };

    const handleNext = () => {
        // Logic for next button click
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
                        Login
                    </button>
                </div>
            </form>
            <div className="flex items-center justify-between">
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handlePrevious}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
