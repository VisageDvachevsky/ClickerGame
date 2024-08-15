import React from 'react';
import styled from 'styled-components';

const CounterWrapper = styled.div`
  font-size: 24px;
  margin: 20px 0;
`;

function HairCounter({ hairCount }) {
  return (
    <CounterWrapper>
      Removed hairs: {hairCount} / 5000
    </CounterWrapper>
  );
}

export default HairCounter;