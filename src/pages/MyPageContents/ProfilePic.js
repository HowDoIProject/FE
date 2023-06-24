import React, { useState, useRef } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { doggy } from '../../assets/doggy.svg';

const ProfilePicture = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files[0];

        console.log('Selected file:', file);
        setSelectedFile(file);
    };

    return (
        <div
            className="rounded-full overflow-hidden w-12 h-12 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            {selectedFile ? (
                <img className="absolute top-[186px] left-[30px] w-20 h-20" alt="" src="/group-7387.svg" />
            ) : (
                <FaUserCircle className="w-full h-full text-gray-800" onClick={handleEditClick} />
            )}
            {isHovered && (
                <div className="absolute top-1 right-1">
                    <FaEdit className="w-4 h-4 text-gray-800 cursor-pointer" onClick={handleEditClick} />
                </div>
            )}
        </div>
    );
};

export default ProfilePicture;
