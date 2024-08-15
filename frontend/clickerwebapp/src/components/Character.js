import React from 'react';
import styled from 'styled-components';

const CharacterWrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: #ddd;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function Character({ hairCount, setHairCount }) {
  const handleClick = () => {
    setHairCount(prevCount => prevCount + 1);
  };

  return (
    <CharacterWrapper onClick={handleClick}>
      {/* Здесь будет изображение персонажа */}
      <p>Tap me!</p>
    </CharacterWrapper>
  );
}

export default Character;