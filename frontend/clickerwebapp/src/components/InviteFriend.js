import React from 'react';
import styled from 'styled-components';

const InviteWrapper = styled.div`
  margin: 20px 0;
`;

const InviteButton = styled.button`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

function InviteFriend() {
  const handleInvite = () => {
    // Here we would typically integrate with a sharing API
    alert("Invite link copied! Share it with your friend to get 500 bonus points!");
  };

  return (
    <InviteWrapper>
      <InviteButton onClick={handleInvite}>
        Invite a Friend (+500 points)
      </InviteButton>
    </InviteWrapper>
  );
}

export default InviteFriend;