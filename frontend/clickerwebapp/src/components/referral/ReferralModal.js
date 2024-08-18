import React, { useState, useEffect } from 'react';
import './referralModal.css';
import axios from 'axios';

const API_BASE_URL = '/API'; 

const ReferralModal = ({ userId, isOpen, onClose }) => {
    const [referralCode, setReferralCode] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [copied, setCopied] = useState(false);
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchReferralCode();
            fetchReferralCount();
        }
    }, [isOpen, userId]);

    const fetchReferralCode = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/referral/generate-code`, { userId });
            if (response.data.success) {
                setReferralCode(response.data.referralCode);
            } else {
                console.error('Error fetching referral code:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching referral code:', error.response ? error.response.data : error.message);
        }
    };
    
    const fetchReferralCount = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/referral/count`, { params: { userId } });
            if (response.data.success) {
                setReferralCount(response.data.count);
            } else {
                console.error('Error fetching referral count:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching referral count:', error.response ? error.response.data : error.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        createConfetti();
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    const createConfetti = () => {
        const newConfetti = [];
        for (let i = 0; i < 50; i++) {
            newConfetti.push({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`, 
                translateX: `${Math.random() * 200 - 100}px`, 
                translateY: `${Math.random() * 200 - 100}px`, 
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`
            });
        }
        setConfetti(newConfetti);
        setTimeout(() => setConfetti([]), 3000);
    };
    

    return (
        <div className="referralModalBackdrop">
            <div className="referralModalContent">
                <h2 className="referralTitle">Referral Program</h2>
                <div className="referralInfo">
                    <p className="infoItem">Share your referral code with friends:</p>
                    <div className="referralCodeContainer">
                        <input type="text" value={referralCode} readOnly className="referralCodeInput" />
                        <button onClick={copyToClipboard} className={`copyButton ${copied ? 'copied' : ''}`}>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <p className="infoItem">Total referrals: <span className="referralCount">{referralCount}</span></p>
                </div>
                <button className="closeButton" onClick={onClose}>Close</button>
                {confetti.map((conf, index) => (
                    <div
                        key={index}
                        className="confetti"
                        style={{
                            left: conf.left,
                            top: conf.top, // Указываем начальное положение сверху
                            transform: `translate(${conf.translateX}, ${conf.translateY})`, // Задаем смещение
                            animationDuration: conf.animationDuration,
                            animationDelay: conf.animationDelay
                        }}
                    ></div>
                ))}

            </div>
        </div>
    );
};

export default ReferralModal;