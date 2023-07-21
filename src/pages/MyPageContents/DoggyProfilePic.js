import React, { useState, useRef } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import image3 from '../../assets/icon/newdog.svg';

const DoggyProfilePicture = () => {
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [isHovered, setIsHovered] = useState(false);
    // const fileInputRef = useRef(null);

    // const handleEditClick = () => {
    //     fileInputRef.current.click();
    // };

    // const handleFileChange = event => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    // };

    return (
        <div className="w-[96px] h-[96px] flex justify-center items-center">
            <img src={image3} className="w-full h-full" />
            {/* <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            /> */}
        </div>
    );
};

export default DoggyProfilePicture;
