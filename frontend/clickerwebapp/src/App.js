import React, { useState, useEffect } from 'react';
import Character from './components/character/Character';
import HairCounter from './components/hairSidebar/hairCounter';
import Header from './components/header/header';
import UsernameModal from './components/usernameModal/UsernameModal';
import Background from './components/background/background';
import LevelUpModal from './components/levelUpModal/LevelUpModal'; 
import ProfileModal from './components/profileModal/ProfileModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getHairStatus, addToBuffer } from './services/hairService';
import { fetchPoints, processHairRemoval } from './services/pointsService';
import { updateBackground } from './services/backgroundService';
import StoreModal from './components/storeModal/StoreModal';
import './App.css';

const API_BASE_URL = '/API';

function App() {
    const [userId, setUserId] = useState(null);
    const [hairCount, setHairCount] = useState(0);
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(1); 
    const [showLevelUpModal, setShowLevelUpModal] = useState(false); 
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showStoreModal, setShowStoreModal] = useState(false);
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
                    fetchAndSetPoints(userIdFromCookie),
                    fetchAndSetLevel(userIdFromCookie) 
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

    const fetchAndSetLevel = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getUserLevel`, {
                params: { userId: id }
            });
            setLevel(response.data.level);
        } catch (error) {
            console.error('Error fetching user level:', error);
        }
    };

    const handleUsernameSubmit = (id) => {
        setUserId(id);
        fetchHairStatus(id);
        fetchAndSetPoints(id);
        fetchAndSetLevel(id);
    };

    const handleRemoveHair = async () => {
        if (hairCount > 0) {
            setHairCount(prev => prev - 1);
            addToBuffer(userId, 1);
            
            try {
                const newPoints = await processHairRemoval(userId, points, 1, level);
                setPoints(newPoints);
                
                const response = await axios.post(`${API_BASE_URL}/updateLevel`, { userId });
                const { level: newLevel, backgroundIndex: newBackgroundIndex } = response.data;
                
                if (newLevel > level && newLevel <= 6) {
                    setLevel(newLevel);
                    setShowLevelUpModal(true);
                }
                
                if (newLevel <= 6) {
                    const backgroundResponse = await updateBackground(userId, newPoints);
                }
            } catch (error) {
                console.error('Error processing hair removal:', error);
            }
        }
    };

    const updatePoints = async (userId, newPoints) => {
        try {
            await axios.post(`${API_BASE_URL}/updatePoints`, { userId, points: newPoints });
            setPoints(newPoints);
        } catch (error) {
            console.error('Error updating points:', error);
        }
    };

    const closeLevelUpModal = () => {
        setShowLevelUpModal(false);
    };

    const openProfileModal = () => {
        setShowProfileModal(true);
    };

    const closeProfileModal = () => {
        setShowProfileModal(false);
    };

    const openStoreModal = () => {
        setShowStoreModal(true);
    };

    const closeStoreModal = () => {
        setShowStoreModal(false);
    };

    return (
        <div className="App">
            <Background userId={userId} points={points} level={level} />
            <Header onOpenProfile={openProfileModal} onOpenStore={openStoreModal} />
            {!userId ? (
                <UsernameModal onSubmit={handleUsernameSubmit} />
            ) : (
                <div className="game-container">
                    <HairCounter 
                        hairCount={hairCount} 
                        maxHairCount={maxHairCount}
                        points={points}
                        level={level} 
                    />
                    <Character userId={userId} hairCount={hairCount} onRemoveHair={handleRemoveHair} />
                </div>
            )}
            {showLevelUpModal && (
                <LevelUpModal level={level} onClose={closeLevelUpModal} />
            )}
            {showProfileModal && (
                <ProfileModal 
                    isOpen={showProfileModal}
                    onClose={closeProfileModal}
                    userId={userId}
                    hairCount={hairCount}
                    points={points}
                    level={level}
                />
            )}
            {showStoreModal && (
                <StoreModal 
                    isOpen={showStoreModal}
                    onClose={closeStoreModal}
                    userId={userId}
                    points={points}
                    updatePoints={updatePoints}
                />
            )}
        </div>
    );
}

export default App;