import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import SignUp from './SignUp';

const UserInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state?.user_type;
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verify_code, setVerifyCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);
    const [verificationError, setVerificationError] = useState(null);
    const [cookies, setCookie] = useCookies(['verification']);
    const [isVerified, setIsVerified] = useState(false);
    const [user_number, setUserNumber] = useState('');
    const [user_type, setUserType] = useState('');
    const [value, setValue] = useState({
        user_type,
        user_number,
        nickname,
        password,
        password_confirm: password,
    });

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedMinutes}:${formattedSeconds} minutes`;
    };

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [remainingTime]);

    const handleUserNumberChange = event => {
        setUserNumber(event.target.value);
    };

    const handleVerificationCodeChange = event => {
        setVerifyCode(event.target.value);
    };

    const handleSendVerificationCode = () => {
        if (user_number) {
            axios
                .post('https://howdoiapp.shop/api/send', {
                    user_number,
                })
                .then(response => {
                    console.log('인증번호 전송에 성공!');
                })
                .catch(error => {
                    console.error('Error: 인증번호 전송에 실패했습니다.', error);
                });
        } else {
            console.error('휴대전화 번호가 입력해주세요');
        }
    };

    const handleVerificationCodeSubmit = event => {
        event.preventDefault();

        if (verify_code && user_number) {
            const payload = {
                user_number,
                verify_code,
            };

            //API 인증코드
            axios
                .post('https://howdoiapp.shop/api/verify', payload, {
                    // headers: {
                    //     Verification: user_number,
                    // },
                })
                .then(response => {
                    const success = response.data;
                    if (success) {
                        const verification = user_number.toString();
                        setCookie('accessToken', verification, {
                            path: '/',
                            sameSite: 'none',
                            secure: true,
                        });

                        console.log('휴대전화 인증 성공!');
                        setIsVerified(true);
                    }
                })
                .catch(error => {
                    console.error('Error: Authentication failed', error);
                    setVerificationError('Authentication failed');
                });
        } else {
            console.error('Verification code or phone number is empty.');
        }
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
        const nicknameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
        const isValid = nicknameRegex.test(nickname);
        console.log('Nickname validation:', isValid);
        return isValid;
    };

    const validatePassword = password => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateForm = () => {
        const isNicknameValid = validateNickname(nickname);
        const isPasswordValid = validatePassword(password);
        // const isUserNumberValid = validateUserNumber(phoneNumber);

        console.log('Nickname validation:', isNicknameValid);
        console.log('Password validation:', isPasswordValid);
        // console.log('User number validation:', isUserNumberValid);

        const isValid = isNicknameValid && isPasswordValid;
        console.log('Form validation:', isValid);

        return isValid;
    };

    const handlePrevious = event => {
        event.preventDefault();
        navigate('/SignUp');
    };

    // const validateUserNumber = userNumber => {
    //     return userNumber.trim() !== '';
    // };
    // useEffect(() => {
    //     console.log(value);
    // }, [value]);
    const handleSignUp = () => {
        console.log(value);
        setValue({
            ...value,
            user_type: userType,
            user_number,
            nickname,
            password,
            password_confirm: password,
        });
    };

    // const SignupData = {
    //     user_type: userType,
    //     user_number: phoneNumber,
    //     nickname,
    //     password,
    //     password_confirm: confirmPassword,
    //     category: [],
    // };

    const handleNext = () => {
        navigate('/Interest', {
            state: {
                user_type: userType,
                nickname,
                password,
                password_confirm: confirmPassword,
                user_number,
            },
        });
        console.log('State:', {
            user_type: userType,
            nickname,
            password,
            password_confirm: confirmPassword,
            user_number,
        });
    };

    // const signUpData = {
    //     user_type: userType,
    //     user_number: phoneNumber,
    //     nickname,
    //     password,
    //     password_confirm: confirmPassword,
    // };

    // 여기에 회원 가입 처리 로직을 추가하세요
    // 백엔드 서버와의 통신 등 필요한 작업을 수행합니다

    // // 예시로 console.log를 사용하여 회원 가입 데이터를 출력합니다
    // console.log(signUpData);

    // 회원 가입 후에 필요한 추가 작업을 수행하세요

    // setValue를 사용하여 상태 업데이트 등을 수행할 수 있습니다
    // setSignUpData();
    // console.log(setSignUpData);

    // const handleNext = event => {
    //     event.preventDefault();
    //     console.log(signUpData);

    //     if (validateForm()) {
    //         const state = { signUpData };
    //         navigate('/Interest', { state });
    //         console.log('Registration completed successfully.');
    //     } else {
    //         console.log('Invalid subscription data.');
    //     }
    // };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-96 p-8 mt-4">
                    <h1 className="text-2xl mb-6 text-center">번호입력</h1>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="번호를 입력하세요"
                        className="w-60 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        value={user_number}
                        onChange={handleUserNumberChange}
                    />

                    <button
                        type="button"
                        onClick={handleSendVerificationCode}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                    >
                        인증받기
                    </button>
                </div>
                <div className="w-96 p-8  mb-4">
                    <h1 className="text-2xl mb-6 text-center">인증번호입력</h1>
                    <form
                        onSubmit={handleVerificationCodeSubmit}
                        className="mt-4 flex flex-wrap justify-between items-center"
                    >
                        <input
                            type="text"
                            name="verificationCode"
                            placeholder="인증번호를 입력하세요"
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                            value={verify_code}
                            onChange={handleVerificationCodeChange}
                        />
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                disabled={remainingTime <= 0}
                                className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                            >
                                확인
                            </button>
                        </div>
                    </form>
                    <p className="text-center">Remaining Time: {formatTime(remainingTime)}</p>
                    {verificationError && <p>{verificationError}</p>}
                    {isVerified && <p>Authentication succeeded</p>}
                </div>

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
                                id="password_confirm"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSignUp}
                        >
                            회원 가입
                        </button>

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
            </div>
        </>
    );
};

export default UserInfo;
