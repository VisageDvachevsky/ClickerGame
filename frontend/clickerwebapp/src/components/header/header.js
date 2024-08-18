import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const Header = ({ onOpenProfile, onOpenStore, onToggleMusic, isMusicPlaying, isMusicEnabled, onOpenReferrals  }) => {
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
                    <li><a href="#" className="menu-item">...</a></li>
                </ul>
            </nav>
            <button 
                className="music-toggle" 
                onClick={handleMusicToggle} 
                disabled={!audioLoaded}
            >
                {isMusicEnabled ? (isMusicPlaying ? '🔇' : '🔊') : '🎵'}
            </button>
        </header>
    );
};

export default Header;
