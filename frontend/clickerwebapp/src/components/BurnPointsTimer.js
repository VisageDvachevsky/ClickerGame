import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
  font-size: 16px;
  margin: 15px 0;
  color: #dc3545;
`;

function BurnPointsTimer() {
  const [daysLeft, setDaysLeft] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(prevDays => {
        if (prevDays <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevDays - 1;
      });
    }, 86400000); // Уменьшаем на 1 каждые 24 часа

    return () => clearInterval(timer);
  }, []);

  return (
    <TimerWrapper>
      Points will burn in: {daysLeft} days
    </TimerWrapper>
  );
}

export default BurnPointsTimer;