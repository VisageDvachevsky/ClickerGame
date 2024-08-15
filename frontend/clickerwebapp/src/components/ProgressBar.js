import React from 'react';
import styled from 'styled-components';

const BarWrapper = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 15px 0;
`;

const BarFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #4caf50;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

function ProgressBar({ level, hairCount }) {
  const pointsPerLevel = 10000;
  const currentLevelPoints = hairCount % pointsPerLevel;
  const percentage = (currentLevelPoints / pointsPerLevel) * 100;

  return (
    <div>
      <p>Level: {level}</p>
      <BarWrapper>
        <BarFill percentage={percentage} />
      </BarWrapper>
      <p>{currentLevelPoints} / {pointsPerLevel} points</p>
    </div>
  );
}

export default ProgressBar;