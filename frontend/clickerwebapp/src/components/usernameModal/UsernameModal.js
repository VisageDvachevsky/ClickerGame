import React, { useState } from 'react';
import './UsernameModal.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { stringToNumber } from '../../utils/stringToNumber';

const API_BASE_URL = 'http://localhost:5000/API';

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
                <h2>Enter Your Username</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        placeholder="Enter your nickname"
                        className="username-input"
                        required
                    />
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsernameModal;