import React from 'react';
import './hairCounter.css';

const HairCounter = ({ hairCount, maxHairCount }) => {
    const percentage = Math.min(Math.max((hairCount / maxHairCount) * 100, 0), 100);

    return (
        <div className="hair-counter-container">
            <div className="hair-counter-bar">
                <div 
                    className="hair-counter-fill" 
                    style={{ height: `${percentage}%` }} 
                />
            </div>
            <div className="hair-counter-text">
                {percentage.toFixed(1)}%
            </div>
        </div>
    );
};

export default HairCounter;