import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { MembershipContext } from '../../shared/Router';
import logo from '../../assets/icon/logo.svg';
import doggysignup from '../../assets/icon/doggysignup.svg';
import activesignup from '../../assets/icon/activesignup.svg';
import activeparents from '../../assets/icon/activeparents.svg';
import nonactiveparents from '../../assets/icon/nonactiveparents.svg';
import activenextbutton from '../../assets/icon/activenextbutton.svg';
import nonactivenextbutton from '../../assets/icon/nonactivenextbutton.svg';

export default function SignUp() {
    // const { value, dispatch } = useContext(MembershipContext);
    const Navigate = useNavigate();
    const [user_type, setUserType] = useState('');
    const [activeImage, setActiveImage] = useState(false);
    const [value, setValue] = useState({
        user_type,
        // user_number,
        // nickname,
        // password,
        // password_confirm: password,
    });

    const handleUserTypeSelect = user_type => {
        setValue({ ...value, user_type: user_type });
    };

    const handleNextClick = () => {
        console.log(value);
        Navigate('/UserInfo', { state: { user_type: value.user_type } });
    };

    return (
        <>
            <div className="flex flex-col bg-beige-500 gap-6 p-4 items-center">
                <div className="text-xl font-bold">회원가입</div>
                <div className="flex flex-col items-center gap-6 w-full max-w-md p-4">
                    <div className="relative w-25 h-15 right-20 max-w-xs p-2 border border-orange-100 bg-whitesmoke-300 rounded-lg text-center ml-left">
                        <p>Q. 욕실거울에 때가 잘 안져요 ㅠ_ㅠ</p>
                    </div>
                    <div className="relative w-50 h-15 max-w-xs p-2 border border-orange-100 bg-whitesmoke-300 rounded-lg text-center left-20">
                        <p>A. 주방세제를 활용해보는 거 어때요?</p>
                    </div>
                    <div className="label">
                        <b className="absolute top-[264px] left-[18px] text-[20px] leading-[28px] text-sub-">
                            <p className="m-0">모든 자취걱정거리를 내려놓는</p>
                            <p className="m-0">고민 해결 플랫폼</p>
                        </b>
                    </div>
                    <div className="relative flex items-center w-50 h-15 right-10 max-w-xs p-5 bg-whitesmoke-300 rounded-lg ml-left mt-10">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="label">
                        <b className="absolute top-[487px] left-[18px] leading-[22px] text-color1">
                            어떤 회원으로 가입하시나요?
                        </b>
                    </div>
                </div>
                {/* 
                <div className="flex justify-between gap-4"> */}
                <div className="flex flex-col ">
                    {/* <h1 className="text-sm mb-2">도와주고 싶어요!</h1> */}
                    {/* <button
                            className={`text-white px-4 py-2 transition duration-300 ease-in-out w-full max-w-xs ${
                                value.user_type === '엄빠' ? 'bg-darkblue' : 'bg-blue-500'
                            } rounded-full hover:bg-darkblue`}
                            onClick={() => handleUserTypeSelect('엄빠')}
                        >
                            엄빠
                        </button> */}
                    {/* </div> */}
                    {/* <div className="flex flex-col items-center">
                        <h1 className="text-sm mb-2">도움이 필요해요!</h1>
                        <button
                            className={`text-white px-4 py-2 transition duration-300 ease-in-out w-full max-w-xs ${
                                value.user_type === '강아지' ? 'bg-darkgray' : 'bg-gray-500'
                            } rounded-full hover:bg-darkgray`}
                            onClick={() => handleUserTypeSelect('강아지')}
                        >
                            강아지
                        </button>
                    </div> */}
                    <div className="">
                        <div onClick={() => handleUserTypeSelect('강아지')}>
                            <img
                                src={value.user_type === '강아지' ? activesignup : doggysignup}
                                className="mr-5"
                                alt="Puppy"
                            />
                            {/* <div className="flex flex-col justify-center">
                                <span>강아지</span>
                                <span className="mt-1">자취 관련 도움을 받고 싶어요!</span>
                            </div> */}
                        </div>
                    </div>

                    <div className="">
                        <div onClick={() => handleUserTypeSelect('엄빠')}>
                            <img
                                src={value.user_type === '엄빠' ? activeparents : nonactiveparents}
                                className="mr-5"
                                alt="parents"
                            />
                            {/* <div className="flex flex-col justify-center">
                                <span>엄빠</span>
                                <span className="mt-1">자취 관련 도움을 주고 싶어요!</span>
                            </div> */}
                        </div>
                    </div>
                    <div className="p-2">
                        <div onClick={handleNextClick}>
                            <img
                                src={activeImage ? activenextbutton : nonactivenextbutton}
                                className="mr-6"
                                alt="Next Button"
                            />
                        </div>
                    </div>
                </div>
                {/* <button
                    onClick={handleNextClick}
                    className="text-white px-4 py-2 mt-4 transition duration-300 ease-in-out w-full max-w-xs bg-blue-500 rounded-full hover:bg-darkblue"
                >
                    Next
                </button> */}
            </div>
        </>
    );
}
