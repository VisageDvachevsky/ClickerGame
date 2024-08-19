import React, { useState, useEffect } from 'react';
import './profileModal.css';
import { hexToString } from '../../utils/stringUtils';
import WarningModal from './WarningModal';

const ProfileModal = ({ isOpen, onClose, userId }) => {
    const [profile, setProfile] = useState(null);
    const [showCoupon, setShowCoupon] = useState(false);
    const [warningModalOpen, setWarningModalOpen] = useState(false);

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
            console.log('Fetching profile data...');
            const response = await fetch(`/api/profile?userId=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Profile data fetched:', data);
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handlePresentClick = () => {
        console.log('Present button clicked, opening warning modal...');
        setWarningModalOpen(true);
    };

    const handleConfirmUseCoupon = async () => {
        console.log('Confirm button clicked...');
    
        if (!profile) {
            console.error('Profile is not defined');
            return;
        }
    
        if (!profile.activeCoupon) {
            console.error('No active coupon found in profile:', profile);
            return;
        }
    
        console.log('Using coupon:', profile.activeCoupon);
    
        setWarningModalOpen(false);
    
        try {
            const response = await fetch('/api/useCoupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: profile.userId,
                    couponCode: profile.activeCoupon.couponId 
                }),
            });
    
            const result = await response.json();
            if (result.success) {
                console.log('Coupon successfully used:', result);
                setShowCoupon(true);
            } else {
                console.error('Failed to use coupon:', result.error);
            }
        } catch (error) {
            console.error('Error using coupon:', error);
        }
    };
    

    const handleCancel = () => {
        console.log('Cancel button clicked, closing warning modal...');
        setWarningModalOpen(false);
    };

    if (!isOpen || !profile) return null;

    const username = hexToString(profile.userId);

    return (
        <div className="profileModalBackdrop " onClick={onClose}>
            <div className="profileModalContent" onClick={(e) => e.stopPropagation()}>
                <h2 className="profileTitle">Profile</h2>
                <div className="profileInfo">
                    <p className="username">{username}</p>
                    <p className="infoItem">
                        <span className="icon">🏆</span>
                        Level: {profile.level}
                    </p>
                    <p className="infoItem">
                        <span className="icon">💎</span>
                        Points: {profile.points}
                    </p>
                    <p className="infoItem">
                        <span className="icon">✂️</span>
                        Hairs: {profile.hairCount}
                    </p>
                    {profile.activeCoupon && !showCoupon && (
                        <button className="presentButton" onClick={handlePresentClick}>
                            Present
                        </button>
                    )}
                    {profile.activeCoupon && showCoupon && (
                        <div className="activeCoupon">
                            <h3>Active Coupon</h3>
                            <p>${profile.activeCoupon.discount} Discount</p>
                            <img src={profile.activeCoupon.qrCode} alt="QR Code" className="qrCode" />
                            <p>Expires: {new Date(profile.activeCoupon.expiresAt).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
                <button className="profileCloseButton" onClick={onClose}>Close</button>

                <WarningModal 
                    isOpen={warningModalOpen}
                    onConfirm={handleConfirmUseCoupon}
                    onCancel={handleCancel}
                    message="Are you sure you want to use this coupon? This action is irreversible."
                />
            </div>
        </div>
    );
};

export default ProfileModal;
