import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 20px;
  background: var(--bg-white);
`;

const LoadingBall = styled.div`
  width: 40px;
  height: 40px;
  background-image: url('/icons/ball.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${bounce} 1s infinite ease-in-out;
`;

const LoadingText = styled.p`
  margin-top: 16px;
  font-family: var(--font-pixel);
  color: var(--text-primary);
  font-size: 14px;
`;

const Loading: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LoadingContainer>
      <LoadingBall />
      <LoadingText>{t('loading')}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;