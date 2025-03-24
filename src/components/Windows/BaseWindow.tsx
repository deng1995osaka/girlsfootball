import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CloseButton } from '../UI/StyledButton';

// 定义断点
const breakpoints = {
  mobile: '20rem',    // 320px
  tablet: '48rem',    // 768px
  laptop: '64rem',    // 1024px
  desktop: '80rem'    // 1280px
};

interface WindowContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement>;
  onClick?: (e: React.MouseEvent) => void;
  width?: number;
}

interface SideBarProps {
  children?: React.ReactNode;
  onMouseDown?: (e: React.MouseEvent) => void;
}

const SideBar = styled.div<SideBarProps>`
  background: var(--bg-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  cursor: grab;
  justify-content: space-between;

  &:active {
    cursor: grabbing;
  }
`;

const WindowContainer = styled.div<WindowContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  background: var(--bg-white);
  border: 0.125rem solid var(--window-border);
  border-radius: 1rem;
  width: ${props => props.width ? `${props.width / 16}rem` : '37.5rem'};
  min-height: 12.5rem;
  box-shadow: 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1.875rem 1fr;
  animation: windowAppear 0.2s ease-out;
  overflow: hidden;
  will-change: transform;
  transform-origin: 0 0;

  > *:not(${SideBar}) {
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: ${props => props.width ? `${props.width / 16}rem` : '45rem'};
    min-height: 15rem;
  }

  @media (min-width: ${breakpoints.laptop}) {
    width: ${props => props.width ? `${props.width / 16}rem` : '50rem'};
    min-height: 18.75rem;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: ${props => props.width ? `${props.width / 16}rem` : '50rem'};
    min-height: 21.875rem;
  }

  @keyframes windowAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  onFocus?: () => void;
  zIndex?: number;
  variant?: 'video' | 'default';
  width?: number;
}

const MIN_LEFT = 7.375; // 导航栏宽度(7.5rem)减去窗口边框宽度(0.125rem)
const MIN_TOP = 0;

const BaseWindow: React.FC<WindowProps> = ({
  isOpen,
  onClose,
  children,
  defaultPosition = { x: Math.max(MIN_LEFT * 16, 100), y: 100 },
  onFocus,
  zIndex = 1,
  variant = 'default',
  width
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(defaultPosition);

  useEffect(() => {
    if (!windowRef.current) return;
    
    // 设置初始位置
    const el = windowRef.current;
    el.style.transform = `translate(${defaultPosition.x}px, ${defaultPosition.y}px)`;
    positionRef.current = defaultPosition;
  }, []);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = windowRef.current;
    if (!el) return;

    // 窗口被点击时触发onFocus
    onFocus?.();

    // 记录鼠标按下时的位置
    const mouseStartX = e.clientX;
    const mouseStartY = e.clientY;
    const startX = positionRef.current.x;
    const startY = positionRef.current.y;

    const handleMouseMove = (e: MouseEvent) => {
      // 计算鼠标移动的距离
      const deltaX = e.clientX - mouseStartX;
      const deltaY = e.clientY - mouseStartY;

      // 计算新位置
      const newX = startX + deltaX;
      const newY = startY + deltaY;

      // 获取窗口尺寸用于边界检查
      const windowWidth = el.offsetWidth;
      const windowHeight = el.offsetHeight;
      const maxX = window.innerWidth - windowWidth;
      const maxY = window.innerHeight - windowHeight;

      // 应用边界限制
      const boundedX = Math.min(Math.max(newX, MIN_LEFT * 16), maxX);
      const boundedY = Math.min(Math.max(newY, MIN_TOP * 16), maxY);

      positionRef.current = { x: boundedX, y: boundedY };
      el.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleWindowClick = () => {
    onFocus?.();
  };

  return (
    <WindowContainer
      ref={windowRef}
      style={{ zIndex }}
      onClick={handleWindowClick}
      width={width}
    >
      <SideBar onMouseDown={handleMouseDown}>
        <CloseButton onClick={onClose}>✖</CloseButton>
      </SideBar>
      {children}
    </WindowContainer>
  );
};

export default BaseWindow; 