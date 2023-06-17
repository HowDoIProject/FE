import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { MembershipContext } from '../../shared/Router';

export default function SignUp() {
    // const { value, dispatch } = useContext(MembershipContext);
    const Navigate = useNavigate();
    const [userType, setUserType] = useState();
    const [value, setValue] = useState({
        user_type: userType,
        // user_number: '',
        // nickname: '',
        // password: '',
        // password_confirm: '',
        // category: 123,
    });

    const handleUserTypeSelect = userType => {
        setValue({ ...value, user_type: userType });
    };

    const handleNextClick = () => {
        console.log(value);
        Navigate('/UserInfo', { state: { userType: value.user_type } });
    };

    return (
        <>
            <div className="flex flex-col gap-6 p-4 border-2 border-black items-center">
                <div className="text-xl font-bold">회원가입</div>
                <div className="flex flex-col items-center gap-6 w-full max-w-md p-4">
                    <div className="relative w-80 h-15 max-w-xs p-5 bg-gray-300 rounded-lg text-center ml-left">
                        <p>엄빠없는 세상은 험하다!</p>
                    </div>
                    <div className="relative w-50 h-15 max-w-xs p-5 bg-gray-300 rounded-lg text-center ml-auto">
                        <p>우리 강아지 잘 하고 있나?</p>
                    </div>
                    <div className="relative w-50 h-15 max-w-xs p-5 bg-gray-300 rounded-lg text-center ml-right">
                        <p>그런 모든 고민들 하우두아이에 내려놓으세요!</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold">How Do I?</h2>
                        <h1 className="text-lg">
                            하우두아이에 어서오세요
                            <br />
                            어떤 회원으로 가입하시겠습니까?
                        </h1>
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col items-center">
                        <h1 className="text-sm mb-2">도와주고 싶어요!</h1>
                        <button
                            className={`text-white px-4 py-2 transition duration-300 ease-in-out w-full max-w-xs ${
                                value.user_type === '엄빠' ? 'bg-darkblue' : 'bg-blue-500'
                            } rounded-full hover:bg-darkblue`}
                            onClick={() => handleUserTypeSelect('엄빠')}
                        >
                            엄빠
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-sm mb-2">도움이 필요해요!</h1>
                        <button
                            className={`text-white px-4 py-2 transition duration-300 ease-in-out w-full max-w-xs ${
                                value.user_type === '강아지' ? 'bg-darkgray' : 'bg-gray-500'
                            } rounded-full hover:bg-darkgray`}
                            onClick={() => handleUserTypeSelect('강아지')}
                        >
                            강아지
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleNextClick}
                    className="text-white px-4 py-2 mt-4 transition duration-300 ease-in-out w-full max-w-xs bg-blue-500 rounded-full hover:bg-darkblue"
                >
                    Next
                </button>
            </div>
        </>
    );
}
