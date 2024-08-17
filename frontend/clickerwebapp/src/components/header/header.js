import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const Header = ({ onOpenProfile }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        onOpenProfile();
        setIsMenuOpen(false);
    };

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
            <h1 className="game-title">Hair Removal Clicker</h1>
            <nav ref={menuRef} className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><button onClick={handleProfileClick} className="menu-item profile-button">Profile</button></li>
                    <li><a href="#" className="menu-item">...</a></li>
                    <li><a href="#" className="menu-item">...</a></li>
                    <li><a href="#" className="menu-item">...</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;