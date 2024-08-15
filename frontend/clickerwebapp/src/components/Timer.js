import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { calculateRegrowthTime } from '../services/hairService';

const TimerWrapper = styled.div`
  font-size: 18px;
  margin: 15px 0;
`;

function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateRegrowthTime(Date.now() - 7200000); // Пример: последнее удаление было 2 часа назад
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <TimerWrapper>
      Time until full regrowth: {formatTime(timeLeft)}
    </TimerWrapper>
  );
}

export default Timer;