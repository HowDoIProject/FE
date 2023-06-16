import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MembershipContext } from '../../shared/Router';
import { useCookies } from 'react-cookie';

const UserInfo = () => {
    const { value, dispatch } = useContext(MembershipContext);
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);
    const [verificationError, setVerificationError] = useState(null);
    const [cookies, setCookie] = useCookies(['verification-token']);
    const formRef = useRef();
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    const formatTime = time => {
        const minutes = Math.floor(time / 60); // Calculate the minutes
        const seconds = time % 60; // Calculate the seconds

        // Pad the minutes and seconds with leading zeros if necessary
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedMinutes}:${formattedSeconds} minutes`;
    };

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000); // Timer interval set to 1000 milliseconds (1 second)
            return () => clearTimeout(timer);
        }
    }, [remainingTime]);

    const handlePhoneNumberChange = event => {
        setPhoneNumber(event.target.value);
    };

    const handleVerificationCodeChange = e => {
        setVerificationCode(event.target.value);
        const code = e.target.value;
        setVerificationCode(code);
    };

    const handleSendVerificationCode = () => {
        // formRef가 현재 DOM 요소를 참조하는지 확인합니다.
        if (formRef.current) {
            const userInput = formRef.current.querySelector('input[name="user"]');
            // userInput이 존재하는지 확인합니다.
            if (userInput) {
                const userNumber = userInput.value;

                // 이제 API 호출을 할 수 있습니다.
                axios.post('http://3.34.191.171/api/send', { user_number: userNumber });
            } else {
                console.error('입력하신 것을 찾을 수 없습니다.');
            }
        } else {
            console.error('form 참조가 null로 되어있습니다.');
        }
    };

    const handleVerificationCodeSubmit = event => {
        event.preventDefault();
        const user_number = document.getElementById('userNumberInput').value;
        const verify_code = document.getElementById('verifyCodeInput').value;
        const payload = {
            user_number,
            verify_code,
        };

        axios
            .post('http://3.34.191.171/api/verify', payload)
            .then(response => {
                const token = response.data.token;
                if (token) {
                    setCookie('jwt_token', token, { path: '/' });
                }
            })
            .catch(error => {
                console.error('Error:인증에 실패했습니다.', error);
            });
    };

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
        navigate('/SignUp');
        console.log('이전으로 가기 버튼이 눌려졌습니다.!');
    };

    const handleNext = event => {
        event.preventDefault();
        if (validateForm()) {
            dispatch({ ...value, user_number: '', nickname: '', password: '' });
            navigate('/Interest');
            console.log('가입이 성공적으로 되었습니다.');
        } else {
            console.log('유효하지 않은 가입 데이터입니다');
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-96 p-8 mt-4">
                    <h1 className="text-2xl mb-6 text-center">번호입력</h1>
                    <form ref={formRef} onSubmit={handleSendVerificationCode} className="flex items-center">
                        <input
                            type="text"
                            name="user"
                            placeholder="번호를 입력하세요"
                            className="w-60 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </form>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            type="button"
                            onClick={handleSendVerificationCode}
                            className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                        >
                            인증받기
                        </button>
                    </div>
                </div>
                <div className="w-96 p-8  mb-4">
                    <h1 className="text-2xl mb-6 text-center">인증번호입력</h1>
                    <form
                        onSubmit={handleVerificationCodeSubmit}
                        className="mt-4 flex flex-wrap justify-between items-center"
                    >
                        <input
                            type="text"
                            placeholder="인증번호를 입력하세요"
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                        />
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                disabled={remainingTime <= 0}
                                onClick={handleVerificationCodeSubmit}
                                className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                            >
                                확인
                            </button>
                        </div>
                    </form>
                    <p className="text-center"> Remaining Time: {formatTime(remainingTime)}</p>
                    {verificationError && <p>{verificationError}</p>}
                    {isVerified && <p>Authentication succeeded</p>}
                </div>
                {isVerified && (
                    <div className="w-96 p-8 bg-gray-100 rounded-md shadow-md mb-4">
                        <h2 className="text-center mb-4">아이디 & 닉네임 설정</h2>
                        <form>
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
                                    type="new-password"
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
                )}
            </div>
        </>
    );
};

export default UserInfo;
