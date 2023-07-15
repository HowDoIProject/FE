//회원정보 수정 페이지
//회원 정보를 보기 위해 본인 패스워드 입력 후 수정 가능
//수정가능한 정보는 휴대폰 번호 본인의 나이 또는 자녀의 나이, 관심사 선택지
//수정 후 수정 버튼을 누르면 수정된 정보가 서버에 저장되고 메인 페이지로 이동
//수정 취소 버튼을 누르면 메인 페이지로 이동
//수정 취소 버튼을 누르면 수정된 정보가 서버에 저장되지 않고 메인 페이지로 이동
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PasswordForm() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    const correctPassword = cookies.accessToken || '';

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (password === correctPassword) {
            // console.log('Password is correct.');
            // Navigate to the next page
            navigate('/phonenumberchange');
        } else {
            console.log('Password is incorrect.');
            // Handle incorrect password scenario, e.g., show an error message
        }
        setPassword('');
    };

    return (
        <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4 mt-10">회원 정보 수정</h1>
            <h1>내 정보보기/수정을 위해 비밀번호를 입력해주세요</h1>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
                <div className="mb-4">
                    <label className="block mb-2 mt-10" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 mt-10 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Check
                </button>
            </form>
        </div>
    );
}

export default PasswordForm;
