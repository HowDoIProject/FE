import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUtensils, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const Interest = () => {
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

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Choose Your Interests</h1>
            <div className="grid grid-cols-3 gap-4">
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('society') ? 'bg-blue-500' : 'bg-gray-200 hover:bg-blue-600'
                    }`}
                    onClick={() => handleInterestSelection('society')}
                >
                    <FontAwesomeIcon icon={faUsers} className="text-white" />
                    <span className="ml-2">Society & Human Relations</span>
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('cooking') ? 'bg-green-500' : 'bg-gray-200 hover:bg-green-600'
                    }`}
                    onClick={() => handleInterestSelection('cooking')}
                >
                    <FontAwesomeIcon icon={faUtensils} className="text-white" />
                    <span className="ml-2">Life & Cooking</span>
                </button>
                <button
                    className={`p-4 rounded-lg ${
                        isInterestSelected('finance') ? 'bg-yellow-500' : 'bg-gray-200 hover:bg-yellow-600'
                    }`}
                    onClick={() => handleInterestSelection('finance')}
                >
                    <FontAwesomeIcon icon={faMoneyBill} className="text-white" />
                    <span className="ml-2">Rent & Finance</span>
                </button>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Selected Interests:</h2>
                <ul className="list-disc pl-8">
                    {selectedInterests.map(interest => (
                        <li key={interest}>{interest}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Interest;
