import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

// 添加字体声明
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'EDunDot';
    src: url('/edundot.ttf') format('truetype');
  }
`;

export const PlayerContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  background: var(--bg-white);
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
`;

export const DisplayWindow = styled.div`
  position: relative;
  width: 100%;
  height: 18.75rem;
  background: #000;
  overflow: hidden;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(1.3) contrast(1.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 4;
    animation: flicker 0.15s infinite;
    opacity: 0.02;
    background-image: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3) 0.0625rem,
      transparent 0.0625rem,
      transparent 0.125rem
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 40%
    );
    pointer-events: none;
    z-index: 5;
  }

  @keyframes flicker {
    0% { opacity: 0.01; }
    50% { opacity: 0.02; }
    100% { opacity: 0.01; }
  }
`;

export const ControlPanel = styled.div`
  width: 100%;
  background: #736F63;
  padding: 0.5rem;
  border-top: 0.125rem solid var(--line);
  box-sizing: border-box;

  .display-section {
    background: #1E1919;
    margin-bottom: 0.375rem;
    padding: 0.5rem;
    border: 0.0625rem inset var(--line);
    border-radius: 0.25rem;
    position: relative;
    box-shadow: inset 0 0 0.625rem rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.02)
      );
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.03) 0.0625rem,
        transparent 0.0625rem,
        transparent 0.125rem
      );
      pointer-events: none;
      animation: scanline 10s linear infinite;
    }
  }

  @keyframes scanline {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

export const DisplaySection = styled.div`
  width: 100%;
  background: #1a1a1a;
  margin-bottom: 0.375rem;
  padding: 0.5rem;
  border: 0.0625rem inset var(--line);
  border-radius: 0.25rem;
  position: relative;
  box-shadow: inset 0 0 0.625rem rgba(0, 0, 0, 0.3);
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  
  /* 添加LCD点阵效果 */
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 0.0625rem 0.0625rem, rgba(50, 205, 50, 0.15) 0.0625rem, transparent 0.0625rem);
    background-size: 0.1875rem 0.1875rem;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.03) 0.0625rem,
      transparent 0.0625rem,
      transparent 0.125rem
    );
    pointer-events: none;
    animation: scanline 10s linear infinite;
  }
`;

export const DisplayText = styled.div<{ 
  variant?: 'time' | 'info';
  animationState?: 'play' | 'pause' | 'stop' | 'forward' | 'backward';
} & React.HTMLAttributes<HTMLDivElement>>`
  color: #32CD32;
  font-family: ${props => props.variant === 'time' ? 'var(--font-edun)' : 'var(--font-edun)'};
  font-size: ${props => props.variant === 'time' ? '1.25rem' : '1rem'};
  text-shadow: 0 0 0.5rem rgba(50, 205, 50, 0.8),
               0 0 0.75rem rgba(50, 205, 50, 0.4);
  letter-spacing: ${props => props.variant === 'time' ? '0.1875rem' : '0.125rem'};
  font-weight: ${props => props.variant === 'time' ? 'bold' : 'normal'};
  margin-top: ${props => props.variant === 'info' ? '0.25rem' : '0'};
  line-height: 1.4;
  position: relative;
  width: 100%;
  height: ${props => props.variant === 'time' ? '1.875rem' : '1.5rem'};
  overflow: hidden;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
  
  /* 确保文字在点阵上方 */
  > span {
    position: relative;
    z-index: 2;
  }

  ${props => props.variant === 'info' && `
    position: relative;
    
    span {
      position: absolute;
      white-space: nowrap;
      display: inline-block;
      left: 0;
      right: 0;
      z-index: 2;
    }
  `}

  span {
    animation: ${props => {
      if (props.variant !== 'info') return 'none';
      
      switch (props.animationState) {
        case 'play':
          return 'scrollText 8s linear infinite';
        case 'forward':
          return 'scrollText 4s linear infinite';
        case 'backward':
          return 'scrollTextReverse 4s linear infinite';
        case 'pause':
        case 'stop':
        default:
          return 'none';
      }
    }};
  }

  @keyframes scrollText {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes scrollTextReverse {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export const Visualizer = styled.div`
  background-color: #000;
  height: 0.9375rem;
  margin-top: 0.25rem;
  position: relative;
  z-index: 2;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
`;

export const ControlButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  background: #e0e0e0;
  border: 0.125rem solid var(--line);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  height: 1.5rem;
  cursor: pointer;
  font-family: var(--font-pixel);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #d0d0d0;
    color: black;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #ccc;
  }
`;

export const PlayButton = styled(ControlButton)`
  padding: 0.125rem 0.5rem 0.375rem 0.5rem;
`;

export const Progress = styled.div`
  flex-grow: 1;
  margin-left: 0.25rem;
  height: 0.625rem;
  background: #000;
  border: 0.0625rem solid var(--line);
  border-radius: 0.125rem;
  position: relative;
  cursor: pointer;

  .progress-handle {
    width: 0.875rem;
    height: 1rem;
    background: var(--bg-white);
    border: 0.125rem solid var(--line);
    border-radius: 0.125rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: var(--primary);
    }
  }
` as any;