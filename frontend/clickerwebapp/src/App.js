import React, { useState, useEffect } from 'react';
import Character from './components/character/Character';
import UsernameModal from './components/usernameModal/UsernameModal';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/API';

function App() {
    const [userId, setUserId] = useState(null);

    const checkAutoLogin = async (userIdFromCookie) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/check-login`, {
                params: { userId: userIdFromCookie }
            });

            if (response.data.success) {
                setUserId(userIdFromCookie);
            } else {
                Cookies.remove('userId'); 
            }
        } catch (error) {
            console.error('Error checking login:', error);
        }
    };

    useEffect(() => {
        const storedUserId = Cookies.get('userId');
        if (storedUserId) {
            checkAutoLogin(storedUserId);
        }
    }, []);

    const handleUsernameSubmit = (userId) => {
        setUserId(userId);
    };

    return (
        <div className="App">
            <h1>Hair Removal Game</h1>
            {!userId ? (
                <UsernameModal onSubmit={handleUsernameSubmit} />
            ) : (
                <Character userId={userId} />
            )}
        </div>
    );
}

export default App;
