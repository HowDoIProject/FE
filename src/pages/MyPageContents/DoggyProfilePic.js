import React, { useState, useRef } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import image1 from '../../assets/icon/puppy_dog.svg';

const ProfilePicture = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div className="w-20 h-20 flex justify-center items-center rounded-full bg-[#D9D9D9]">
            <img src={image1} className="w-full h-full text-gray-800" onClick={handleEditClick} />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
        </div>
    );
};

export default ProfilePicture;
