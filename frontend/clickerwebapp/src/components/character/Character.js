import React from 'react';
import './Character.css';
import characterImage from '../../assets/images/characterImage.png';

const Character = ({ userId, hairCount, onRemoveHair }) => {
    const handleClick = () => {
        onRemoveHair();
        
        const imageElement = document.querySelector('.character-image');
        imageElement.classList.add('clicked');
        
        setTimeout(() => {
            imageElement.classList.remove('clicked');
        }, 150); 
    };

    return (
        <div className="character-container">
            <img 
                src={characterImage} 
                alt="Character" 
                className="character-image"  
                onClick={handleClick} 
            />
        </div>
    );
};

export default Character;