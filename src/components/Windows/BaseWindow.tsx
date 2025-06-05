import React, { useRef, useEffect, useCallback, memo, useMemo } from 'react';
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
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
  opacity: 0;
  overflow: hidden;
  
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
      scale: 0.95;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
  animation: windowAppear 0.2s ease-out forwards;
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

const BaseWindow: React.FC<WindowProps> = memo(({
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
  const animationFrameRef = useRef<number>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(false);

  // 使用 useCallback 缓存事件处理函数
  const handleWindowClick = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const handleMouseMove = useCallback((
    e: MouseEvent,
    el: HTMLDivElement,
    mouseStartX: number,
    mouseStartY: number,
    startX: number,
    startY: number
  ) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const deltaX = e.clientX - mouseStartX;
      const deltaY = e.clientY - mouseStartY;
      const newX = startX + deltaX;
      const newY = startY + deltaY;
      
      const windowWidth = el.offsetWidth;
      const windowHeight = el.offsetHeight;
      const maxX = window.innerWidth - windowWidth;
      const maxY = Math.max(0, window.innerHeight - windowHeight);
      
      const boundedX = Math.min(Math.max(newX, MIN_LEFT * 16), maxX);
      const boundedY = Math.min(Math.max(newY, MIN_TOP * 16), maxY);
      
      positionRef.current = { x: boundedX, y: boundedY };
      el.style.transform = `translate3d(${boundedX}px, ${boundedY}px, 0)`;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = windowRef.current;
    if (!el) return;

    onFocus?.();

    const mouseStartX = e.clientX;
    const mouseStartY = e.clientY;
    const startX = positionRef.current.x;
    const startY = positionRef.current.y;

    const handleMouseMoveEvent = (e: MouseEvent) => {
      handleMouseMove(e, el, mouseStartX, mouseStartY, startX, startY);
    };

    const handleMouseUp = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMoveEvent);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // 保存最终位置
      if (el) {
        const transform = window.getComputedStyle(el).transform;
        const matrix = new DOMMatrix(transform);
        positionRef.current = {
          x: matrix.m41,
          y: matrix.m42
        };
      }
    };

    document.addEventListener('mousemove', handleMouseMoveEvent);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, onFocus]);

  // 优化 resize 事件处理
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (!windowRef.current) return;
        
        const el = windowRef.current;
        const windowWidth = el.offsetWidth;
        const windowHeight = el.offsetHeight;
        const maxX = window.innerWidth - windowWidth;
        const maxY = window.innerHeight - windowHeight;
        
        const boundedX = Math.min(Math.max(positionRef.current.x, MIN_LEFT * 16), maxX);
        const boundedY = Math.min(Math.max(positionRef.current.y, MIN_TOP * 16), maxY);
        
        positionRef.current = { x: boundedX, y: boundedY };
        el.style.transform = `translate3d(${boundedX}px, ${boundedY}px, 0)`;
      }, 100); // 100ms 防抖
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 只在首次挂载时设置初始位置
  useEffect(() => {
    if (!windowRef.current || mountedRef.current) return;
    
    const el = windowRef.current;
    el.style.transform = `translate3d(${defaultPosition.x}px, ${defaultPosition.y}px, 0)`;
    positionRef.current = defaultPosition;
    mountedRef.current = true;
  }, [defaultPosition]);

  // 使用 useMemo 缓存窗口尺寸计算
  const windowDimensions = useMemo(() => {
    if (!windowRef.current) return { width: 0, height: 0 };
    const el = windowRef.current;
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }, [windowRef.current]);

  if (!isOpen) return null;

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
});

// 添加组件显示名称，便于调试
BaseWindow.displayName = 'BaseWindow';

export default BaseWindow; 