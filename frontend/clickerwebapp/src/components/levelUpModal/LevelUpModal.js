import React, { useEffect, useCallback } from 'react';
import './levelUpModal.css';

const LevelUpModal = ({ level, onClose }) => {
  const createConfetti = useCallback(() => {
    const confettiCount = 100;
    const confettiColors = ['#ff9a9e', '#fad0c4', '#FFD700', '#4CAF50', '#ffffff'];
    const fragment = document.createDocumentFragment();
    const container = document.querySelector('.level-up-modal-backdrop');
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-10px`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      fragment.appendChild(confetti);
    }

    container.appendChild(fragment);
  }, []);

  useEffect(() => {
    createConfetti();

    const timer = setTimeout(() => {
      const confettiElements = document.querySelectorAll('.confetti');
      confettiElements.forEach(el => el.remove());
    }, 3000);

    return () => {
      clearTimeout(timer);
      const confettiElements = document.querySelectorAll('.confetti');
      confettiElements.forEach(el => el.remove());
    };
  }, [createConfetti]);

  return (
    <div className="level-up-modal-backdrop ">
      <div className="level-up-modal-content">
        <div className="level-up-icon" role="img" aria-label="Celebration">🎉</div>
        <h2>Congratulations!</h2>
        <p>You have reached level {level}!</p>
        <p>Now 1 click brings 2 points more</p>
        <button className="level-up-button" onClick={onClose}>Continue</button>
      </div>
    </div>
  );
};

export default LevelUpModal;