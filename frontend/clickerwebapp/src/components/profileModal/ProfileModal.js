import React, { useState, useEffect } from 'react';
import './profileModal.css';
import { numberToString } from '../../utils/stringUtils';

const ProfileModal = ({ isOpen, onClose, userId }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen, userId]);

    const fetchProfile = async () => {
        if (!userId) {
            console.error('User ID is required');
            return;
        }
        
        try {
            const response = await fetch(`/api/profile?userId=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    if (!isOpen || !profile) return null;

    const username = numberToString(parseInt(profile.userId));

    return (
        <div className="modalBackdrop" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <h2 className="title">Профиль</h2>
                <div className="profileInfo">
                    <p className="username">{username}</p>
                    <p className="infoItem">
                        <span className="icon">🏆</span>
                        Уровень: {profile.level}
                    </p>
                    <p className="infoItem">
                        <span className="icon">💎</span>
                        Очки: {profile.points}
                    </p>
                    <p className="infoItem">
                        <span className="icon">✂️</span>
                        Волосы: {profile.hairCount}
                    </p>
                </div>
                <button className="closeButton" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ProfileModal;
