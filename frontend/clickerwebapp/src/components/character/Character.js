import React, { useRef, useState } from 'react';
import './Character.css';
import characterImage from '../../assets/images/characterImage.png';

const Character = ({ userId, hairCount, onRemoveHair, isClickSoundEnabled }) => {
    const audioRef = useRef(new Audio('./sounds/character_click.mp3')); 

    const handleClick = () => {
        if (isClickSoundEnabled) {
            audioRef.current.play(); 
        }

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
