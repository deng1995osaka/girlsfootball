import styled from 'styled-components';

interface StyledProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

// 容器
export const Container = styled.div`
  padding: var(--spacing-md);
  height: 31.25rem; /* 500px -> 31.25rem */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
`;

// 故事容器
export const StoryBox = styled.div`
  position: relative;
  margin-top: var(--spacing-md);
  margin-bottom: 0; /* 减少底部边距 */
  padding: var(--spacing-md);
  background: var(--bg-white);
  border-radius: 0.5rem; /* 8px -> 0.5rem */
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  &::before {
    content: '';
    position: absolute;
    top: -0.625rem; /* -10px -> -0.625rem */
    left: 0;
    width: 100%;
    border-top: 0.0625rem dashed var(--line); /* 1px -> 0.0625rem */
  }
`;

// 故事文本
export const StoryText = styled.p<StyledProps & { variant?: 'join' }>`
  font-family: var(--font-pixel);
  line-height: 1.8;
  font-size: 0.875rem; /* 14px -> 0.875rem */
  margin: 0;
  color: var(--text-primary);
  
  ${props => props.variant === 'join' && `
    text-align: center;
  `}
`;

// 加入区域
export const JoinBox = styled.div`
  margin: var(--spacing-xl) 0; /* 32px -> 2rem */
  padding: var(--spacing-xl) var(--spacing-md); /* 32px 20px -> 2rem 1.25rem */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md); /* 16px -> 1rem */
  text-align: center;
  position: relative;
  background: var(--bg-white);
  border-radius: 0.5rem; /* 8px -> 0.5rem */
  
  &::before {
    content: '';
    position: absolute;
    top: 0.5rem; /* 8px -> 0.5rem */
    left: 0;
    width: 100%;
    border-top: 0.0625rem dashed var(--line); /* 1px -> 0.0625rem */
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0.5rem; /* 8px -> 0.5rem */
    left: 0;
    width: 100%;
    border-top: 0.0625rem dashed var(--line); /* 1px -> 0.0625rem */
  }
`;

// 内容区域
export const Content = styled.div`
  width: 100%;
  
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
      text-align: left;
      
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
  max-width: 15.625rem;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`; 