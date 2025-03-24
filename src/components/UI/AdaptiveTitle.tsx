import React from 'react';
import styled from 'styled-components';
import Typewriter from './Typewriter';

interface AdaptiveTitleProps {
  text: string;
  speed?: number;
  delay?: number;
}

const StarIcon = styled.div`
  width: 12px;
  height: 12px;
  position: relative;
  display: inline-block;
  color: var(--primary);
  margin: 0 2px;
  transform: rotate(35deg);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: currentColor;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }
`;

const AdaptiveTitle: React.FC<AdaptiveTitleProps> = ({ text, speed = 100, delay = 500 }) => {
  return (
    <TitleContainer>
      <div className="plus">+</div>
      <div className="dash"></div>
      <div className="plus">+</div>
      <div className="text">
        <Typewriter 
          text={text}
          speed={speed}
          delay={delay}
        />
      </div>
      <div className="plus">+</div>
      <div className="dash"></div>
      <div className="plus">+</div>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  color: var(--primary);
  font-size: 20px;
  text-align: center;
  box-sizing: border-box;

  .plus {
    padding: 0 2px;
    font-family: var(--font-mono);
    flex: 0 0 auto;
  }

  .dash {
    flex: 1;
    height: 2px;
    
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 2px;
      background-image: repeating-linear-gradient(
        to right,
        var(--primary) 0,
        var(--primary) 8px,
        transparent 8px,
        transparent 10px
      );
      transform: translateY(-50%);
    }
  }

  .text {
    padding: 0 4px;
    white-space: nowrap;
    flex: 0 0 auto;
    min-width: fit-content;
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

export default AdaptiveTitle; 