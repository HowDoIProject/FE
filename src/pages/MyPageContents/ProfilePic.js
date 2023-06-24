import React, { useState, useRef } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

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
                <img src={URL.createObjectURL(selectedFile)} alt="Profile" className="w-full h-full" />
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
