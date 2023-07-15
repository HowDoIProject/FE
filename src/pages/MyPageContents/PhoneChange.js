import React, { useState } from 'react';

function PhoneChange() {
    const [user_number, setUserNumber] = useState('');

    // Extract only the phone number from the user_number
    const phoneNumber = user_number.replace(/[^0-9]/g, '');

    const handleUserNumberChange = event => {
        setUserNumber(event.target.value);
    };

    // Rest of the component code...

    return (
        <>
            {/* Rest of the JSX */}
            <input
                type="text"
                name="phoneNumber"
                placeholder="번호를 입력하세요"
                className="w-60 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                value={phoneNumber}
                onChange={handleUserNumberChange}
            />
            {/* Rest of the JSX */}
        </>
    );
}

export default PhoneChange;
