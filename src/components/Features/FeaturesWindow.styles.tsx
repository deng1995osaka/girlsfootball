import styled, { keyframes } from 'styled-components';
import { forwardRef } from 'react';

interface StyledProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

// 容器
export const Container = styled.div`
  padding: var(--spacing-md);
  height: 37.5rem; /* 600px -> 37.5rem */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

// 分隔线
export const Divider = styled.div`
  width: 100%;
  height: 0.0625rem; /* 1px -> 0.0625rem */
  margin: var(--spacing-md) 0;
  border-top: 0.0625rem dashed var(--line);
`;

// 功能区块
export const FeatureBox = styled.div<{ children?: React.ReactNode; reverse?: boolean }>`
  margin: 0;
  padding: 0.9375rem 0.9375rem 0; /* 15px -> 0.9375rem */
  background: var(--bg-white);
  border-radius: 0.5rem; /* 8px -> 0.5rem */
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 0;
  direction: ${props => props.reverse ? 'rtl' : 'ltr'};
  width: 100%;
  min-width: 0;

  > * {
    direction: ${props => props.reverse ? 'ltr' : 'ltr'};
    min-width: 0;
  }
`;

// 功能内容区
export const Content = styled.div<{ children?: React.ReactNode }>`
  h2 {
    font-size: 1rem; /* 16px -> 1rem */
    color: var(--primary);
    font-weight: bold;
    margin-bottom: 0.625rem; /* 10px -> 0.625rem */
    font-family: var(--font-pixel);
  }

  h3 {
    color: var(--text-secondary);
    margin-bottom: 0.625rem; /* 10px -> 0.625rem */
    font-size: 0.875rem; /* 14px -> 0.875rem */
    font-weight: normal;
    font-family: var(--font-pixel);
  }

  ul {
    margin: 0.625rem 0; /* 10px -> 0.625rem */
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.25rem; /* 20px -> 1.25rem */
      margin: 0.3125rem 0; /* 5px -> 0.3125rem */
      font-family: var(--font-pixel);
      line-height: 1.5;
      font-size: 0.875rem; /* 14px -> 0.875rem */
      color: var(--text-primary);
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.25rem; /* 4px -> 0.25rem */
        height: 0.25rem; /* 4px -> 0.25rem */
        background: var(--primary);
        transform: translateY(-50%);
      }
    }
  }
`;

// 预览图
export const Preview = styled.div`
  width: 100%;
  max-width: 15.625rem; /* 250px -> 15.625rem */
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    object-fit: contain;
    image-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// 描述文本容器
export const DescriptionBox = styled.div`
  padding-top: 1.875rem; /* 30px -> 1.875rem */
  text-align: center;
  font-family: var(--font-pixel);
  font-size: 0.875rem; /* 14px -> 0.875rem */
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
`;

// 底部文本
export const EndLine = forwardRef<HTMLDivElement, StyledProps>((props, ref) => (
  <StyledEndLine ref={ref} {...props} />
));

const StyledEndLine = styled.div<StyledProps>`
  margin-top: 1.875rem; /* 30px -> 1.875rem */
  text-align: center;
  padding-top: 0.625rem; /* 10px -> 0.625rem */
  color: var(--primary);
  font-family: var(--font-pixel);
  line-height: 1.5;
  font-size: 0.875rem; /* 14px -> 0.875rem */
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1.25rem); /* -20px -> -1.25rem */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedFeatureBox = styled(FeatureBox)<{ 
  isVisible: boolean; 
  delay: number;
  reverse?: boolean;
  onAnimationComplete?: () => void;
}>`
  position: relative;
  opacity: 0;
  animation: ${props => props.isVisible ? slideIn : 'none'} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}ms;

  ${props => props.onAnimationComplete && `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;