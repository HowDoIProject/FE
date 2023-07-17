import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import activenextbutton from '../../assets/icon/activenextbutton.svg';
import nonactivenextbutton from '../../assets/icon/nonactivenextbutton.svg';

const UserInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [buttonActive, setButtonActive] = useState(false);
    const userType = location.state?.user_type;
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verify_code, setVerifyCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);
    const [cookies, setCookie] = useCookies(['verification']);
    const [user_number, setUserNumber] = useState('');
    const [user_type, setUserType] = useState('');
    const [value, setValue] = useState({
        user_type,
        user_number,
        nickname,
        password,
        password_confirm: password,
    });
    const [showVerification, setShowVerification] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (remainingTime > 0 && showVerification) {
            const timer = setTimeout(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [remainingTime, showVerification]);

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
                    setShowVerification(true);
                })
                .catch(error => {
                    console.error('Error: 인증번호 전송에 실패했습니다.', error);
                });
        } else {
            console.error('휴대전화 번호를 입력해주세요');
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
                .post('https://howdoiapp.shop/api/verify', payload)
                .then(response => {
                    const success = response.data;
                    if (success) {
                        const verification = user_number.toString();
                        setCookie('verification', verification, {
                            path: '/',
                            sameSite: 'none',
                            secure: true,
                        });

                        console.log('휴대전화 인증 성공!');
                        alert('전화번호 인증 성공!🤗');
                        setShowInput(true);
                    }
                })
                .catch(error => {
                    console.error('Error: Authentication failed', error);
                    alert('전화번호 인증에 실패했습니다');
                });
        } else {
            console.error('Verification code or phone number is empty.');
            alert('전화번호 인증에 실패했습니다');
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
        return isValid;
    };

    const validatePassword = password => {
        const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

        return regExp.test(password);
    };

    const validateForm = () => {
        const isNicknameValid = validateNickname(nickname);
        const isPasswordValid = validatePassword(password);

        if (isNicknameValid && isPasswordValid && password === confirmPassword) {
            setButtonActive(true);
        }
    };

    const handleNext = () => {
        setValue({
            ...value,
            user_type: userType,
            user_number,
            nickname,
            password,
            password_confirm: password,
        });
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

    return (
        <>
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <div className="mx-auto font-['Pretendard-Bold']">회원가입</div>
                </div>
            </div>
            <div className="mx-auto bg-bgjoin pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen relative">
                <div className="mx-10">
                    <div className="font-['Pretendard-Bold'] mt-[60px] mb-2">휴대폰 인증하기</div>
                    <div className="text-gray_01 text-[14px] mb-5">인증을 위해 번호를 입력해주세요</div>
                    <div className="flex justify-between h-[42px]">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="'-' 없이 번호 입력"
                            className="w-[256px] px-4 py-2 border border-gray_03 rounded-xl"
                            value={user_number}
                            onChange={handleUserNumberChange}
                        />
                        <button
                            type="button"
                            onClick={handleSendVerificationCode}
                            className="py-2 px-3 bg-primary text-white rounded-xl cursor-pointer text-[14px] inline-block"
                        >
                            인증요청
                        </button>
                    </div>
                    {showVerification && (
                        <div className="mb-5">
                            <div className="font-['Pretendard-Bold'] mt-[60px] mb-2">인증번호 입력</div>
                            <form onSubmit={handleVerificationCodeSubmit} className="flex justify-between h-[42px]">
                                <input
                                    type="text"
                                    name="verificationCode"
                                    placeholder="인증번호 6자리 입력"
                                    className="w-[256px] px-4 py-2 border border-gray_03 rounded-xl"
                                    value={verify_code}
                                    onChange={handleVerificationCodeChange}
                                />
                                <button
                                    type="submit"
                                    disabled={remainingTime <= 0}
                                    className="py-2 px-6 bg-primary text-white rounded-xl cursor-pointer text-[14px]"
                                >
                                    확인
                                </button>
                            </form>
                            <div className="text-red mt-3 text-center">{formatTime(remainingTime)}</div>
                        </div>
                    )}
                    {showInput && (
                        <div className="flex flex-col items-center justify-center">
                            <form onSubmit={handleNext}>
                                <label htmlFor="nickname" className="font-['Pretendard-Medium']">
                                    닉네임
                                </label>
                                <input
                                    type="text"
                                    id="nickname"
                                    value={nickname}
                                    onChange={handleNicknameChange}
                                    onKeyUp={validateForm}
                                    className="w-full px-4 py-2 border border-gray_03 rounded-xl mt-1 mb-1"
                                />
                                <div className="mb-4 text-[12px] text-gray_02 ml-1">
                                    영문, 숫자를 포함하여 3자 이상, 16자 이하로 입력해주세요
                                </div>
                                <label htmlFor="password" className="font-['Pretendard-Medium']">
                                    비밀번호
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onKeyUp={validateForm}
                                    className="w-full px-4 py-2 border border-gray_03 rounded-xl mt-1 mb-1"
                                />
                                <div className="mb-4 text-[12px] text-gray_02 ml-1">
                                    영문, 숫자, 특수문자를 포함하여 8자 이상으로 입력해주세요
                                </div>
                                <label htmlFor="confirmPassword" className="font-['Pretendard-Medium']">
                                    비밀번호 확인
                                </label>
                                <input
                                    type="password"
                                    id="password_confirm"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    onKeyUp={validateForm}
                                    className="w-full px-4 py-2 border border-gray_03 rounded-xl mt-1 mb-4"
                                />
                                <button className="mt-8">
                                    <img src={buttonActive ? activenextbutton : nonactivenextbutton} alt="" />
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserInfo;
