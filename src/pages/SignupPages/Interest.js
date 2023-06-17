import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUtensils, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const Interest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleInterestSelection = interest => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const isInterestSelected = interest => {
        return selectedInterests.includes(interest);
    };

    const handlePrevious = event => {
        event.preventDefault();
        navigate('/UserInfo', { state: location.state });
    };

    const handleNext = event => {
        event.preventDefault();
        navigate('/confirm', { state: { ...location.state, selectedInterests } });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Choose Your Interests</h1>
            <div className="grid grid-cols-3 gap-4">
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('1') ? 'bg-blue-500' : 'bg-gray-200 hover:bg-blue-600'
                    }`}
                    onClick={() => handleInterestSelection('1')}
                >
                    <FontAwesomeIcon icon={faUsers} className="text-white" />
                    <span className="ml-2">Society & Human Relations</span>
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('2') ? 'bg-green-500' : 'bg-gray-200 hover:bg-green-600'
                    }`}
                    onClick={() => handleInterestSelection('2')}
                >
                    <FontAwesomeIcon icon={faUtensils} className="text-white" />
                    <span className="ml-2">Life & Cooking</span>
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('3') ? 'bg-yellow-500' : 'bg-gray-200 hover:bg-yellow-600'
                    }`}
                    onClick={() => handleInterestSelection('3')}
                >
                    <FontAwesomeIcon icon={faMoneyBill} className="text-white" />
                    <span className="ml-2">Rent & Finance</span>
                </button>
            </div>
            <div className="mt-4">
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
            </div>
        </div>
    );
};

export default Interest;
