import React, { useState } from 'react';
import styled from 'styled-components';
import { exchangeHairForVoucher } from '../services/voucherService';

const ExchangeWrapper = styled.div`
  margin: 20px 0;
`;

const ExchangeButton = styled.button`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

function VoucherExchange({ hairCount, setHairCount }) {
  const [vouchers, setVouchers] = useState(0);

  const handleExchange = () => {
    const { newHairCount, newVouchers } = exchangeHairForVoucher(hairCount);
    setHairCount(newHairCount);
    setVouchers(vouchers + newVouchers);
  };

  return (
    <ExchangeWrapper>
      <p>Current vouchers: ${vouchers.toFixed(2)}</p>
      <ExchangeButton onClick={handleExchange} disabled={hairCount < 10000}>
        Exchange 10,000 hairs for $1 voucher
      </ExchangeButton>
    </ExchangeWrapper>
  );
}

export default VoucherExchange;