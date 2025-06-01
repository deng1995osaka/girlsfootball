import styled, { keyframes } from 'styled-components';

interface StyledProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

// 容器
export const Container = styled.div`
  padding: var(--spacing-md);
  height: 37.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

// 分隔线
export const Divider = styled.div`
  width: 100%;
  height: 0.0625rem;
  margin: var(--spacing-md) 0;
  border-top: 0.0625rem dashed var(--line);
`;

// 功能区块
export const FeatureBox = styled.div<{ children?: React.ReactNode; reverse?: boolean }>`
  margin: 0;
  padding: 0.9375rem 0.9375rem 0;
  background: var(--bg-white);
  border-radius: 0.5rem;
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
  margin-top: 1.8rem;
  h2 {
    font-size: 1.2rem;
    color: var(--primary);
    margin-bottom: 0.625rem;
    font-weight: normal;
    font-family: var(--font-pixel);
  }

  h3 {
    color: var(--text-secondary);
    margin-bottom: 0.625rem;
    font-size: 0.875rem;
    font-weight: normal;
    font-family: var(--font-pixel);
  }

  ul {
    margin: 0.625rem 0;
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.25rem;
      margin: 0.3125rem 0;
      font-family: var(--font-pixel);
      line-height: 1.5;
      font-size: 0.875rem;
      color: var(--text-primary);
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.25rem;
        height: 0.25rem;
        background: var(--primary);
        transform: translateY(-50%);
      }
    }
  }
`;

// 预览图
export const Preview = styled.div`
  width: 100%;
  max-width: 15.625rem;
  display: flex;
  justify-content: center;
  will-change: transform;
  transform: translateZ(0);

  img {
    width: 100%;
    object-fit: contain;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform 0.3s ease;
  }
`;

// 描述文本容器
export const DescriptionBox = styled.div`
  padding-top: 1.875rem;
  text-align: center;
  font-family: var(--font-pixel);
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
`;

const StyledEndLine = styled.div<StyledProps>`
  margin-top: 1.875rem;
  text-align: center;
  padding-top: 0.625rem;
  color: var(--primary);
  font-family: var(--font-pixel);
  line-height: 1.5;
  font-size: 0.875rem;
`;

export const EndLine = styled(StyledEndLine)``;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
`;

export const AnimatedFeatureBox = styled(FeatureBox)<{ 
  isVisible: boolean; 
  delay: number;
  reverse?: boolean;
}>`
  position: relative;
  opacity: 0;
  will-change: transform, opacity;
  transform: translateZ(0);
  animation: ${props => props.isVisible ? slideIn : 'none'} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}ms;
  backface-visibility: hidden;
  perspective: 1000px;
`;