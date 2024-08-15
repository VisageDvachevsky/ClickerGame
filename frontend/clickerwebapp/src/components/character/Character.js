import React, { useState, useEffect } from 'react';
import { getHairStatus, addToBuffer } from '../../services/hairService';
import './Character.css';
import characterImage from '../../assets/images/characterImage.png';

const Character = ({ userId }) => {
    const [hairCount, setHairCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);  

    useEffect(() => {
        const fetchHairStatus = async () => {
            const count = await getHairStatus(userId);
            setHairCount(count);
        };

        fetchHairStatus();
    }, [userId]);

    const handleRemoveHair = () => {
        setHairCount(prev => prev - 1);
        addToBuffer(userId, 1);
        
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 100); 
    };

    return (
        <div className="character-container">
            <img 
                src={characterImage} 
                alt="Character" 
                className={`character-image ${isClicked ? 'clicked' : ''}`}  
                onClick={handleRemoveHair} 
            />
            <div className="hair-count">Hair Count: {hairCount}</div>
        </div>
    );
};

export default Character;
