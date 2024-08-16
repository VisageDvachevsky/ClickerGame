import React, { useState, useEffect } from 'react';
import styles from './profileModal.css';
import { numberToString } from '../../utils/stringUtils';

const ProfileModal = ({ isOpen, onClose, userId }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen, userId]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/profile?userId=${userId}`);
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const numberToString = (num) => {
        let str = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        while (num > 0) {
            str = chars[num % chars.length] + str;
            num = Math.floor(num / chars.length);
        }
        return str || 'Anonymous';
    };

    if (!isOpen || !profile) return null;

    const username = numberToString(parseInt(profile.userId));

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Профиль</h2>
                <div className={styles.profileInfo}>
                    <p className={styles.username}>{username}</p>
                    <p className={styles.infoItem}>
                        <span className={styles.icon}>🏆</span>
                        Уровень: {profile.level}
                    </p>
                    <p className={styles.infoItem}>
                        <span className={styles.icon}>💎</span>
                        Очки: {profile.points}
                    </p>
                    <p className={styles.infoItem}>
                        <span className={styles.icon}>✂️</span>
                        Волосы: {profile.hairCount}
                    </p>
                </div>
                <button className={styles.closeButton} onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ProfileModal;