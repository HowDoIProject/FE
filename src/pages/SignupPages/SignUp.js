import React, { useState } from 'react';
import { useNavigate, Link, Form } from 'react-router-dom';
import logo from '../../assets/icon/logo.svg';
import doggysignup from '../../assets/icon/doggysignup.svg';
import activesignup from '../../assets/icon/activesignup.svg';
import activeparents from '../../assets/icon/activeparents.svg';
import nonactiveparents from '../../assets/icon/nonactiveparents.svg';
import activenextbutton from '../../assets/icon/activenextbutton.svg';
import nonactivenextbutton from '../../assets/icon/nonactivenextbutton.svg';

export default function SignUp() {
    const Navigate = useNavigate();
    const [value, setValue] = useState({
        user_type: '',
    });
    const [buttonActive, setButtonActive] = useState(false);

    const onChange = e => {
        const { name, value } = e.target;
        console.log('onchange실행');
        setValue({ [name]: value });
        setButtonActive(true);
    };

    console.log('뭐선택했는지value', value);
    const onSubmit = e => {
        e.preventDefault();
        Navigate('/UserInfo', { state: { user_type: value.user_type } });
    };

    return (
        <>
            <div className="flex items-center fixed top-0 px-6 w-full border-b-[0.5px] border-slate-300 h-[52px] z-20 bg-white">
                <div className="relative max-w-[420px] mx-auto w-full flex justify-between items-center">
                    <div className="mx-auto font-['Pretendard-Bold']">회원가입</div>
                </div>
            </div>
            <div className="mx-auto bg-bgjoin pt-[52px] pb-[80px] min-w-[360px] max-w-[420px] h-full min-h-screen relative">
                <div className="flex flex-col items-center">
                    <div className="mr-[120px] px-4 py-2 shadow-button text-gray_02 mt-6 rounded-2xl">
                        Q. 욕실거울에 때가 잘 안져요 ㅠ_ㅠ
                    </div>
                    <div className="ml-[120px] px-4 py-2 shadow-button text-gray_02 mt-6 rounded-2xl">
                        A. 주방세제를 활용해보는 거 어때요?
                    </div>
                    <div className="text-brown font-['Pretendard-Bold'] text-[20px] mt-8 mr-[120px]">
                        <p>모든 자취걱정거리를 내려놓는</p>
                        <p>고민 해결 플랫폼</p>
                    </div>
                    <img className="h-[45px] mt-6" src={logo} alt="Logo" />
                    <div className="mt-10 font-['Pretendard-Bold']">어떤 회원으로 가입하시나요?</div>
                </div>
                <div className="flex flex-col items-center mt-6">
                    <form onSubmit={onSubmit}>
                        <label htmlFor="puppy">
                            <input
                                onChange={onChange}
                                id="puppy"
                                type="radio"
                                name="user_type"
                                value="강아지"
                                required
                            />
                            <img src={value.user_type === '강아지' ? activesignup : doggysignup} alt="puppy" />
                        </label>
                        <label htmlFor="parents">
                            <input
                                onChange={onChange}
                                id="parents"
                                type="radio"
                                name="user_type"
                                value="엄빠"
                                required
                            />
                            <img src={value.user_type === '엄빠' ? activeparents : nonactiveparents} alt="puppy" />
                        </label>
                        <button className="mt-8">
                            <img className="ml-2" src={buttonActive ? activenextbutton : nonactivenextbutton} alt="" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
