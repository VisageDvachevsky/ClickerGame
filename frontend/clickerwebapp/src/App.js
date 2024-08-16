import React, { useState, useEffect } from 'react';
import Character from './components/character/Character';
import HairCounter from './components/hairSidebar/hairCounter';
import Header from './components/header/header';
import UsernameModal from './components/usernameModal/UsernameModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getHairStatus, addToBuffer } from './services/hairService';
import './App.css';

const API_BASE_URL = '/API';

function App() {
    const [userId, setUserId] = useState(null);
    const [hairCount, setHairCount] = useState(0);
    const maxHairCount = 5000;

    const checkAutoLogin = async (userIdFromCookie) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/check-login`, {
                params: { userId: userIdFromCookie }
            });

            if (response.data.success) {
                setUserId(userIdFromCookie);
                fetchHairStatus(userIdFromCookie);
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

    const fetchHairStatus = async (id) => {
        const count = await getHairStatus(id);
        setHairCount(count);
    };

    const handleUsernameSubmit = (id) => {
        setUserId(id);
        fetchHairStatus(id);
    };

    const handleRemoveHair = () => {
        if (hairCount > 0) {
            setHairCount(prev => prev - 1);
            addToBuffer(userId, 1);
        }
    };

    return (
        <div className="App">
            <Header />
            {!userId ? (
                <UsernameModal onSubmit={handleUsernameSubmit} />
            ) : (
                <div className="game-container">
                    <HairCounter 
                        hairCount={hairCount} 
                        maxHairCount={maxHairCount}
                    />
                    <Character userId={userId} hairCount={hairCount} onRemoveHair={handleRemoveHair} />
                </div>
            )}
        </div>
    );
}

export default App;