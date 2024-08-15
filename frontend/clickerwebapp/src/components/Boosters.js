import React, { useState } from 'react';
import styled from 'styled-components';

const BoosterWrapper = styled.div`
  margin: 20px 0;
`;

const BoosterButton = styled.button`
  background-color: #17a2b8;
  margin: 0 5px;
  &:hover {
    background-color: #138496;
  }
`;

function Boosters() {
  const [currentBooster, setCurrentBooster] = useState(1);

  const upgradeBooster = () => {
    if (currentBooster < 6) {
      setCurrentBooster(prevBooster => prevBooster + 1);
    }
  };

  return (
    <BoosterWrapper>
      <p>Current Booster: Level {currentBooster}</p>
      <BoosterButton onClick={upgradeBooster} disabled={currentBooster >= 6}>
        Upgrade Booster
      </BoosterButton>
    </BoosterWrapper>
  );
}

export default Boosters;