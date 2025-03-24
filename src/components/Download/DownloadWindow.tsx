import React from 'react';
import styled from 'styled-components';

interface StyledComponentProps {
  children?: React.ReactNode;
}

interface PlatformIconProps extends StyledComponentProps {
  iconUrl: string;
}

const Container = styled.div<StyledComponentProps>`
  padding: var(--spacing-md);
  font-family: var(--font-pixel);
  line-height: 1.6;
  min-height: 12.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-white);
`;

const ComingSoonText = styled.span<StyledComponentProps>`
  font-family: var(--font-retro);
  font-size: 1.25rem;
  color: var(--text-primary);
  opacity: 0.8;
  letter-spacing: 0.0625rem;
  text-align: center;
  display: inline-block;
  margin-bottom: 2rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BallWrapper = styled.div`
  position: relative;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PixelBall = styled.div<StyledComponentProps>`
  width: 4rem;
  height: 4rem;
  background-image: url('/icons/ball.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: bounce 1s infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-0.625rem); }
  }

  @media (min-width: 768px) {
    width: 5rem;
    height: 5rem;
  }
`;

const BallShadow = styled.div`
  width: 3rem;
  height: 0.625rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-top: 0.25rem;
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

  @media (min-width: 768px) {
    width: 4rem;
    height: 0.75rem;
  }
`;

const Message = styled.p<StyledComponentProps>`
  font-size: 1rem;
  color: var(--text-primary);

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PlatformList = styled.div<StyledComponentProps>`
  display: flex;
  gap: 2rem;
  margin-top: 1.25rem;
  align-items: center;
  justify-content: center;
`;

const PlatformIcon = styled.div<PlatformIconProps>`
  width: 2rem;
  height: 2rem;
  background-image: url(${props => props.iconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const DownloadWindow: React.FC = () => {
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

export default DownloadWindow; 