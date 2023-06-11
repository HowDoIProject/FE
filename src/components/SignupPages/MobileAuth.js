import React, { useState, useEffect } from 'react';

export default function MobileAuthScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [remainingTime]);

    const handlePhoneNumberChange = event => {
        setPhoneNumber(event.target.value);
    };

    const handleVerificationCodeChange = event => {
        setVerificationCode(event.target.value);
    };

    const handleVerificationCodeSubmit = event => {
        event.preventDefault();

        console.log('Verification code:', verificationCode);
    };

    return (
        <div className="flex flex-col justify-center items-between h-screen">
            <div className="w-96 p-8 bg-gray-100 rounded-md shadow-md mt-4">
                <h1 className="text-2xl mb-6 text-center">Mobile Phone Input</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Enter your mobile phone number"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </form>
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                    >
                        Send Verification Code
                    </button>
                </div>
            </div>
            <div className="w-96 p-8 bg-gray-100 rounded-md shadow-md mb-4">
                <h1 className="text-2xl mb-6 text-center">Verification Code Input</h1>
                <form
                    onSubmit={handleVerificationCodeSubmit}
                    className="mt-4 flex flex-wrap justify-between items-center"
                >
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        value={remainingTime > 0 ? verificationCode : ''}
                        onChange={handleVerificationCodeChange}
                    />
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={remainingTime <= 0}
                            className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                        >
                            Verify
                        </button>
                    </div>
                </form>
                <p className="text-center">
                    {remainingTime > 0 ? `Remaining Time: ${remainingTime}s` : 'Time Expired'}
                </p>
            </div>
        </div>
    );
}
