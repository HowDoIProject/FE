import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteScrapButton({ filter, category, cookies }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // const handleDeleteScrap = async () => {
    //     setIsModalVisible(false);

    //     try {
    //         await axios.delete(`https://howdoiapp.shop/api/scrap/${filter}/${category}`, {
    //             params: { filter, category },
    //             headers: {
    //                 access: cookies.accessToken,
    //             },
    //         });

    //         console.log('Scrap deleted successfully');
    //     } catch (error) {
    //         console.error('Error deleting scrap:', error);
    //     }
    // };

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div>
            {/* <button
                onClick={handleModalToggle}
                className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded"
            >
                삭제하기
            </button> */}
            {isModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-white rounded shadow-lg p-8 max-w-sm mx-auto">
                        <h2 className="text-lg font-bold mb-4">정말 삭제하시겠습니까?</h2>
                        <div className="flex justify-end">
                            <button
                                onClick={handleDeleteScrap}
                                className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded mr-2"
                            >
                                네
                            </button>
                            <button
                                onClick={handleModalToggle}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                            >
                                아니오
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
