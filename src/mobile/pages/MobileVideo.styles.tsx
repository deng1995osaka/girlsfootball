import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 2.75rem);
  background: var(--background-color);
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  color: var(--text-primary);
  text-align: center;
  margin: 0;
  padding: 0.5rem 0;
  font-weight: 600;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
  background: var(--line);
  border-radius: 1rem;
  border: 0.125rem solid var(--line);
  position: relative;
  overflow: hidden;

  /* 复古纹理效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) 0px,
        rgba(255, 255, 255, 0.05) 0.0625rem,
        transparent 0.0625rem,
        transparent 0.125rem
      );
    pointer-events: none;
    z-index: 1;
  }

  /* 覆盖 VideoPlayer 样式 */
  .VideoPlayer-styles__PlayerContainer-sc-* {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .VideoPlayer-styles__DisplayWindow-sc-* {
    aspect-ratio: 4/3;
    border: 0.125rem solid var(--line);
    border-radius: 0.5rem;
    overflow: hidden;
    background: #000;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      );
      background-size: 100% 0.25rem;
      z-index: 2;
      pointer-events: none;
      animation: scanline 10s linear infinite;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at center,
        transparent 50%,
        rgba(0, 0, 0, 0.4) 100%
      );
      z-index: 3;
      pointer-events: none;
    }
  }

  .VideoPlayer-styles__ControlPanel-sc-* {
    background: var(--line);
    border-top: 0.125rem solid var(--line);
    padding: 0.75rem;
  }

  .VideoPlayer-styles__DisplaySection-sc-* {
    background: #000;
    border: 0.0625rem solid var(--line);
    box-shadow: inset 0 0 0.625rem rgba(0, 0, 0, 0.5);
  }

  .VideoPlayer-styles__DisplayText-sc-* {
    color: var(--primary);
    text-shadow: 0 0 0.5rem rgba(230, 126, 34, 0.8);
    font-family: var(--font-retro);
    font-size: 0.75rem;
  }

  .VideoPlayer-styles__Controls-sc-* {
    gap: 0.25rem;
  }

  .VideoPlayer-styles__ControlButton-sc-*,
  .VideoPlayer-styles__PlayButton-sc-* {
    background: var(--line);
    border: 0.125rem solid var(--text-secondary);
    color: var(--primary);
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 
      inset -0.0625rem -0.0625rem 0 0 #000,
      inset 0.0625rem 0.0625rem 0 0 var(--text-secondary);

    &:active {
      box-shadow: 
        inset 0.0625rem 0.0625rem 0 0 #000,
        inset -0.0625rem -0.0625rem 0 0 var(--text-secondary);
      transform: translate(0.0625rem, 0.0625rem);
    }
  }

  .VideoPlayer-styles__Progress-sc-* {
    background: #000;
    border: 0.0625rem solid var(--line);
    height: 0.5rem;

    .progress-handle {
      background: var(--primary);
      border: 0.125rem solid var(--line);
      width: 0.75rem;
      height: 0.75rem;
    }
  }

  @keyframes scanline {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
  text-align: center;
  max-width: 30rem;
  margin: 0 auto;
  white-space: pre-line;
`;