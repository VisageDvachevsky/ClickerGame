import React, { useState } from 'react';
import './UsernameModal.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { stringToHex } from '../../utils/stringUtils';

const API_BASE_URL = '/API';

const UsernameModal = ({ onSubmit, startMusic }) => {
    const [username, setUsername] = useState('');
    const [referralCode, setReferralCode] = useState('');

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleReferralChange = (e) => {
        setReferralCode(e.target.value.toUpperCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            const userId = stringToHex(username.trim());

            try {
                const loginResponse = await axios.post(`${API_BASE_URL}/login`, { userId });

                if (loginResponse.data.success) {
                    Cookies.set('userId', userId, { expires: 365 });

                    if (referralCode) {
                        const referralResponse = await axios.post(`${API_BASE_URL}/apply-referral-code`, { 
                            userId, 
                            referralCode 
                        });
                        if (referralResponse.data.success) {
                            console.log('Referral code applied successfully');
                        } else {
                            console.log(referralResponse.data.message);
                        }
                    }

                    startMusic(); 
                    onSubmit(userId); 
                } else {
                    console.error('Error from server:', loginResponse.data.message);
                }
            } catch (error) {
                console.error('Error submitting username:', error);
            }
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Choose Your Nickname</h2>
                <p>Make it fun and unique!</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            value={username}
                            onChange={handleChange}
                            placeholder="Nickname"
                            className="username-input"
                            required
                        />
                        <span className="nickname-icon">🎮</span>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={referralCode}
                            onChange={handleReferralChange}
                            placeholder="Have a referral code? Enter it here"
                            className="referral-input"
                            maxLength="6"
                        />
                        <span className="referral-icon">🔗</span>
                    </div>
                    <button type="submit" className="submit-button">
                        Let's Go!
                    </button>
                </form>
            </div>
        </div>
    );    
};

export default UsernameModal;