import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const Header = ({ onOpenProfile, onOpenStore, onToggleMusic, isMusicPlaying, isMusicEnabled, onOpenReferrals, onToggleClickSound, isClickSoundEnabled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [audioLoaded, setAudioLoaded] = useState(false); 
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleTouchOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchOutside);
        return () => {
            document.removeEventListener('touchstart', handleTouchOutside);
        };
    }, []);

    const handleProfileClick = () => {
        onOpenProfile();
        setIsMenuOpen(false);
    };

    const handleStoreClick = () => {
        onOpenStore();
        setIsMenuOpen(false);
    };

    const handleMusicToggle = () => {
        onToggleMusic();
    };
    
    const handleReferralsClick = () => {
        onOpenReferrals();
        setIsMenuOpen(false);
    };

    const handleClickSoundToggle = () => {
        onToggleClickSound();
    };

    useEffect(() => {
        setAudioLoaded(true); 
    }, []);

    return (
        <header className="game-header">
            <button
                ref={buttonRef}
                className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h1 className="game-title">
                Hair Removal 
                <span className="subtitle">by Tina Electra</span>
            </h1>
            <nav ref={menuRef} className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><button onClick={handleProfileClick} className="menu-item profile-button">Profile</button></li>
                    <li><button onClick={handleStoreClick} className="menu-item store-button">Store</button></li>
                    <li><button onClick={handleReferralsClick} className="menu-item referrals-button">Referrals</button></li>
                    <li><a href="https://www.instagram.com/tina.electra" target="_blank" rel="noopener noreferrer" className="menu-item social-link instagram">Instagram</a></li>
                    <li><a href="https://t.me/tina_electra" target="_blank" rel="noopener noreferrer" className="menu-item social-link telegram">Telegram</a></li>
                </ul>
            </nav>
            <button 
                className="music-toggle" 
                onClick={handleMusicToggle} 
                disabled={!audioLoaded}
            >
                {isMusicEnabled ? (isMusicPlaying ? '🔊' : '🔇') : '🎵'}
            </button>
            <button 
                className="click-sound-toggle" 
                onClick={handleClickSoundToggle} 
            >
                {isClickSoundEnabled ? '🔈' : '🔇'}
            </button>
        </header>
    );
};

export default Header;
