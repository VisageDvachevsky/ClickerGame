import React, { useState, useEffect } from 'react';
import { getBackgroundUrl, fetchCurrentBackground } from '../../services/backgroundService';
import './background.css';

const Background = ({ userId, points, level }) => {  
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const loadInitialBackground = async () => {
      if (userId) {
        try {
          const initialIndex = await fetchCurrentBackground(userId);
          setBackgroundIndex(initialIndex);
        } catch (error) {
          console.error('Failed to load initial background:', error);
        }
      }
    };
    loadInitialBackground();
  }, [userId]);

  useEffect(() => {
    if (level >= 6) {
      setBackgroundIndex(5);  
    } else {
      const newIndex = Math.floor(points / 10000) % 6;
      if (newIndex !== backgroundIndex) {
        setBackgroundIndex(newIndex);
      }
    }
  }, [points, level, backgroundIndex]);

  const backgroundImage = getBackgroundUrl(backgroundIndex);

  return <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }} />;
};

export default Background;