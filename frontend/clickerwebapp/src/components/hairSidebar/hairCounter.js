import React, { useState, useEffect, useRef } from 'react';
import './hairCounter.css';

const HairCounter = ({ hairCount, maxHairCount }) => {
    const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 60 });
    const [isDragging, setIsDragging] = useState(false);
    const counterRef = useRef(null);
    const isDraggingRef = useRef(false);
    const offsetRef = useRef({ x: 0, y: 0 });

    const percentage = Math.min(Math.max((hairCount / maxHairCount) * 100, 0), 100);

    const handleStart = (clientX, clientY) => {
        setIsDragging(true);
        isDraggingRef.current = true;
        const rect = counterRef.current.getBoundingClientRect();
        offsetRef.current = {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const handleMove = (clientX, clientY) => {
        if (isDraggingRef.current) {
            const newX = clientX - offsetRef.current.x;
            const newY = clientY - offsetRef.current.y;
            setPosition(adjustPositionToFitScreen(newX, newY));
        }
    };

    const handleEnd = () => {
        if (isDraggingRef.current) {
            isDraggingRef.current = false;
            setIsDragging(false);
            snapToEdge();
        }
    };

    const adjustPositionToFitScreen = (x, y) => {
        if (!counterRef.current) return { x, y };

        const rect = counterRef.current.getBoundingClientRect();
        const textHeight = 50; 
        const totalHeight = rect.height + textHeight;

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - totalHeight;

        if (y > maxY) {
            y = maxY;
        }

        return {
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY))
        };
    };

    const snapToEdge = () => {
        setPosition(prev => {
            const rect = counterRef.current.getBoundingClientRect();
            const newX = prev.x < window.innerWidth / 2 ? 0 : window.innerWidth - rect.width;
            return adjustPositionToFitScreen(newX, prev.y);
        });
    };

    useEffect(() => {
        const handleMouseDown = (e) => handleStart(e.clientX, e.clientY);
        const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
        const handleTouchStart = (e) => {
            e.preventDefault();
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        };
        const handleTouchMove = (e) => {
            e.preventDefault(); 
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };

        counterRef.current.addEventListener('mousedown', handleMouseDown);
        counterRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        return () => {
            counterRef.current?.removeEventListener('mousedown', handleMouseDown);
            counterRef.current?.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        };
    }, []);

    return (
        <div 
            ref={counterRef}
            className={`hair-counter-container ${isDragging ? 'dragging' : ''}`}
            style={{ 
                position: 'absolute',
                left: `${position.x}px`, 
                top: `${position.y}px`,
                cursor: 'move',
                transition: isDragging ? 'none' : 'left 0.5s ease, top 0.5s ease',
            }}
        >
            <div className="hair-counter-bar">
                <div 
                    className="hair-counter-fill" 
                    style={{ height: `${percentage}%` }} 
                />
            </div>
            <div className="hair-counter-text">
                {percentage.toFixed(1)}%
            </div>
        </div>
    );
};

export default HairCounter;
