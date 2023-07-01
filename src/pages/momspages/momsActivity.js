import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MomsActivity = () => {
    const location = useLocation();
    const { user_type, nickname, user_id } = location.state || {};

    return (
        <div className="flex flex-col items-start p-4">
            <div className="w-16 h-16 bg-white rounded-md shadow-md">{/* Place your icon image here */}</div>

            <div className="mt-4 w-full">
                <div className="graph">
                    <div className="graph-bar bg-blue-500" style={{ width: '60%' }}>
                        <div className="graph-label">내가 쓴 답 </div>
                    </div>
                    <div className="graph-bar bg-green-500" style={{ width: '30%' }}>
                        <div className="graph-label">도웁 됬어요 </div>
                    </div>
                    <div className="graph-bar bg-black-500" style={{ width: '70%' }}>
                        <div className="graph-label">게시글</div>
                    </div>
                </div>
            </div>

            <div className="flex mt-4">
                <div className="graph-legend">
                    <div className="legend-item">
                        <div className="legend-color bg-blue-500"></div>
                        <div className="legend-text">What I Wrote</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color bg-green-500"></div>
                        <div className="legend-text">Adopted Article</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color bg-yellow-500"></div>
                        <div className="legend-text">My Post</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MomsActivity;
