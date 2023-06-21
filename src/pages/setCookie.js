


const handleSendVerificationCode = () => {
    if (user_number) {
        axios
            .post('http://3.34.191.171/api/send', { user_number })
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
            .post('http://3.34.191.171/api/verify', payload, {
                // headers: {
                //     Verification: user_number,
                // },
            })
            .then(response => {
                const success = response.data;
                if (success) {
                    setCookie('verification', user_number.toString(), {
                        path: '/',
                        sameSite: 'strict',
                        secure: false,
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