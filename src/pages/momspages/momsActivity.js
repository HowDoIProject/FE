import React from 'react';

const mom_activity = () => {
    return (
        <div className="flex flex-col items-start p-4">
            <div className="w-16 h-16 bg-white rounded-md shadow-md">{/* Place your icon image here */}</div>

            <div className="mt-4 w-full">
                <div className="graph">
                    <div className="graph-bar bg-blue-500" style={{ width: '60%' }}>
                        <div className="graph-label">What I Wrote</div>
                    </div>
                    <div className="graph-bar bg-green-500" style={{ width: '30%' }}>
                        <div className="graph-label">Adopted Article</div>
                    </div>
                    <div className="graph-bar bg-yellow-500" style={{ width: '10%' }}>
                        <div className="graph-label">My Post</div>
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

export default mom_activity;
