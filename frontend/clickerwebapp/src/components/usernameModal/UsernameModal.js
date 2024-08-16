import React, { useState } from 'react';
import './UsernameModal.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { stringToNumber } from '../../utils/stringToNumber';

const API_BASE_URL = '/API';

const UsernameModal = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            const userId = stringToNumber(username.trim());

            try {
                const response = await axios.post(`${API_BASE_URL}/login`, { userId });

                if (response.data.success) {
                    Cookies.set('userId', userId, { expires: 365 }); 

                    onSubmit(userId);
                } else {
                    console.error('Error from server:', response.data.message);
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
                    <button type="submit" className="submit-button">
                        Let's Go!
                    </button>
                </form>
            </div>
        </div>
    );    
    
};

export default UsernameModal;