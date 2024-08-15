import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Character from './components/Character';
import HairCounter from './components/HairCounter';
import Timer from './components/Timer';
import VoucherExchange from './components/VoucherExchange';
import ProgressBar from './components/ProgressBar';
import Tasks from './components/Tasks';
import Boosters from './components/Boosters';
import InviteFriend from './components/InviteFriend';
import BurnPointsTimer from './components/BurnPointsTimer';
import SettingsMenu from './components/SettingsMenu';
import { loadGameState, saveGameState } from './utils/storageUtils';

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

function App() {
  const [gameState, setGameState] = useState({
    hairCount: 0,
    level: 1,
    vouchers: 0,
    lastRemovalTime: Date.now(),
  });

  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setGameState(savedState);
    }
  }, []);

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const updateGameState = (updates) => {
    setGameState(prevState => ({
      ...prevState,
      ...updates,
    }));
  };

  return (
    <AppWrapper>
      <h1>Hair Removal Clicker</h1>
      <Character 
        hairCount={gameState.hairCount} 
        setHairCount={(count) => updateGameState({ hairCount: count, lastRemovalTime: Date.now() })} 
      />
      <HairCounter hairCount={gameState.hairCount} />
      <Timer lastRemovalTime={gameState.lastRemovalTime} />
      <VoucherExchange 
        hairCount={gameState.hairCount} 
        vouchers={gameState.vouchers}
        updateGameState={updateGameState}
      />
      <ProgressBar level={gameState.level} hairCount={gameState.hairCount} />
      <Tasks />
      <Boosters />
      <InviteFriend />
      <BurnPointsTimer />
      <SettingsMenu />
    </AppWrapper>
  );
}

export default App;