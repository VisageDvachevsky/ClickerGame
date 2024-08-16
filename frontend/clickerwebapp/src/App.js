import React, { useState, useEffect } from 'react';
import Character from './components/character/Character';
import HairCounter from './components/hairSidebar/hairCounter';
import Header from './components/header/header';
import UsernameModal from './components/usernameModal/UsernameModal';
import Background from './components/background/background';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getHairStatus, addToBuffer } from './services/hairService';
import { fetchPoints, processHairRemoval } from './services/pointsService';
import { updateBackground } from './services/backgroundService';
import './App.css';

const API_BASE_URL = '/API';

function App() {
    const [userId, setUserId] = useState(null);
    const [hairCount, setHairCount] = useState(0);
    const [points, setPoints] = useState(0);
    const maxHairCount = 5000;

    const checkAutoLogin = async (userIdFromCookie) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/check-login`, {
                params: { userId: userIdFromCookie }
            });

            if (response.data.success) {
                setUserId(userIdFromCookie);
                await Promise.all([
                    fetchHairStatus(userIdFromCookie),
                    fetchAndSetPoints(userIdFromCookie)
                ]);
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

    const fetchAndSetPoints = async (id) => {
        try {
            const fetchedPoints = await fetchPoints(id);
            setPoints(fetchedPoints);
        } catch (error) {
            console.error('Error fetching points:', error);
        }
    };

    const handleUsernameSubmit = (id) => {
        setUserId(id);
        fetchHairStatus(id);
        fetchAndSetPoints(id);
    };

    const handleRemoveHair = async () => {
        if (hairCount > 0) {
            setHairCount(prev => prev - 1);
            addToBuffer(userId, 1);
            
            try {
                const newPoints = await processHairRemoval(userId, points, 1);
                setPoints(newPoints);
                
                await updateBackground(userId, newPoints);
            } catch (error) {
                console.error('Error processing hair removal:', error);
            }
        }
    };

    return (
        <div className="App">
            <Background userId={userId} points={points} />
            <Header />
            {!userId ? (
                <UsernameModal onSubmit={handleUsernameSubmit} />
            ) : (
                <div className="game-container">
                    <HairCounter 
                        hairCount={hairCount} 
                        maxHairCount={maxHairCount}
                        points={points}
                    />
                    <Character userId={userId} hairCount={hairCount} onRemoveHair={handleRemoveHair} />
                </div>
            )}
        </div>
    );
}

export default App;