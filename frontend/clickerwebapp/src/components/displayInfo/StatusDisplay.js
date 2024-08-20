import React from 'react';
import './statusDisplay.css';

const StatusDisplay = ({ hairCount, points }) => {
    return (
        <div className="statusDisplay">
            <p>Hairs: {hairCount}</p>
            <p>Points: {points}</p>
        </div>
    );
};

export default StatusDisplay;
