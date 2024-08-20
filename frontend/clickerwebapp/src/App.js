import React, { useState, useEffect, useRef } from 'react';
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
import ReferralModal from './components/referral/ReferralModal';
import StatusDisplay from './components/displayInfo/StatusDisplay';
import './App.css';

const API_BASE_URL = '/API';

function App() {
    const [userId, setUserId] = useState(null);
    const [hairCount, setHairCount] = useState(0);
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(1); 
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false); 
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showStoreModal, setShowStoreModal] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isMusicEnabled, setIsMusicEnabled] = useState(false);
    const [isClickSoundEnabled, setIsClickSoundEnabled] = useState(true);
    const audioRef = useRef(new Audio('/sounds/MainMusic.mp3'));

    const maxHairCount = 5000;

    useEffect(() => {
        audioRef.current.loop = true;
        return () => {
            audioRef.current.pause();
        };
    }, []);

    const enableMusic = () => {
        setIsMusicEnabled(true);
        startMusic();
    };

    const startMusic = () => {
        audioRef.current.volume = 40;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            
        setIsMusicPlaying(true);
    };

    const toggleMusic = () => {
        if (!isMusicEnabled) {
            enableMusic();
        } else if (isMusicPlaying) {
            audioRef.current.pause();
            setIsMusicPlaying(false);
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            setIsMusicPlaying(true);
        }
    };

    const toggleClickSound = () => {
        setIsClickSoundEnabled(prev => !prev);
    };

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

    const handleUsernameSubmit = async (id) => {
        setUserId(id);
        await Promise.all([
            fetchHairStatus(id),
            fetchAndSetPoints(id),
            fetchAndSetLevel(id)
        ]);
        enableMusic(); 
    };

    const handleRemoveHair = async () => {
        if (hairCount > 0) {
            setHairCount(prev => prev - 1);
            addToBuffer(userId, 1);
            
            if (!isMusicEnabled) {
                enableMusic(); 
            }
            
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
                    await updateBackground(userId, newPoints);
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

    const handleOpenReferrals = () => {
        setIsReferralModalOpen(true);
    };
    

    return (
        <div className="App ">
            <Background userId={userId} points={points} level={level} />
            <Header 
                onOpenProfile={openProfileModal} 
                onOpenStore={openStoreModal} 
                onToggleMusic={toggleMusic}
                isMusicPlaying={isMusicPlaying}
                isMusicEnabled={isMusicEnabled}
                onToggleClickSound={toggleClickSound} 
                isClickSoundEnabled={isClickSoundEnabled} 
                onOpenReferrals={handleOpenReferrals}
            />
            {!userId ? (
                <UsernameModal onSubmit={handleUsernameSubmit} startMusic={startMusic} />
            ) : (
                <div className="game-container">
                    <HairCounter 
                        hairCount={hairCount} 
                        maxHairCount={maxHairCount}
                        points={points}
                        level={level} 
                    />
                    <Character 
                        userId={userId} 
                        hairCount={hairCount} 
                        onRemoveHair={handleRemoveHair} 
                        isClickSoundEnabled={isClickSoundEnabled}
                    />
                    <StatusDisplay hairCount={hairCount} points={points} />
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
            <ReferralModal
                userId={userId}
                isOpen={isReferralModalOpen}
                onClose={() => setIsReferralModalOpen(false)}
            />
        </div>
    );
}

export default App;