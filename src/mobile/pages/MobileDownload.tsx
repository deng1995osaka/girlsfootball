import React from 'react';
import styled from 'styled-components';

interface StyledComponentProps {
  children?: React.ReactNode;
}

const Container = styled.div`
  padding: var(--spacing-sm);
  font-family: var(--font-pixel);
  line-height: 1.6;
  min-height: calc(100vh - 2.75rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-white);
`;

const ComingSoonText = styled.span`
  font-family: var(--font-retro);
  font-size: 1.5rem;
  color: var(--text-primary);
  opacity: 0.8;
  letter-spacing: 0.0625rem;
  text-align: center;
  display: inline-block;
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
`;

const BallWrapper = styled.div`
  position: relative;
  margin: var(--spacing-md) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PixelBall = styled.div`
  width: 4rem;
  height: 4rem;
  background-image: url('/icons/ball.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: bounce 1s infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-0.625rem); }
  }
`;

const BallShadow = styled.div`
  width: 3rem;
  height: 0.625rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  animation: shadow 1s infinite;

  @keyframes shadow {
    0%, 100% { 
      transform: scale(0.8);
      opacity: 0.6;
    }
    50% { 
      transform: scale(0.5);
      opacity: 0.3;
    }
  }
`;

const Message = styled.p<StyledComponentProps>`
  font-size: 1rem;
  color: var(--text-primary);
`;

const MobileDownload: React.FC = () => {
  return (
    <Container>
      <ComingSoonText>
        COMING<br />SOON
      </ComingSoonText>
      
      <BallWrapper>
        <PixelBall />
        <BallShadow />
      </BallWrapper>
      
      <Message>移动端应用即将上线</Message>
    </Container>
  );
};

export default MobileDownload; 