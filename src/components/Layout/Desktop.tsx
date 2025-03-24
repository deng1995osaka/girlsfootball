import React, { useState } from 'react';
import styled from 'styled-components';
import BaseWindow from '../Windows/BaseWindow';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import FeaturesWindow from '../Features/FeaturesWindow';
import PromoWindow from '../Promo/PromoWindow';
import DownloadWindow from '../Download/DownloadWindow';

type WindowKey = 'video' | 'promo' | 'features' | 'download';

interface DesktopProps {
  openWindows: WindowKey[];
  onCloseWindow: (windowId: WindowKey) => void;
}

const Desktop = ({ openWindows, onCloseWindow }: DesktopProps) => {
  // 跟踪窗口层级
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  
  // 当窗口被聚焦时，将其移动到层级顶部
  const handleWindowFocus = (windowId: string) => {
    setWindowOrder(prev => {
      const newOrder = prev.filter(id => id !== windowId);
      return [...newOrder, windowId];
    });
  };

  // 获取窗口的z-index
  const getWindowZIndex = (windowId: string) => {
    const index = windowOrder.indexOf(windowId);
    return index === -1 ? 1 : index + 1;
  };

  const renderWindow = (windowId: string, index: number) => {
    const offsetValue = index * 1.25; // 基础偏移值（rem）
    
    switch (windowId) {
      case 'video':
        return (
          <BaseWindow
            key={windowId}
            isOpen={true}
            onClose={() => onCloseWindow(windowId as WindowKey)}
            defaultPosition={{ 
              x: (9 + offsetValue) * 16, // 转换为像素
              y: (3.125 + offsetValue) * 16 
            }}
            onFocus={() => handleWindowFocus(windowId)}
            zIndex={getWindowZIndex(windowId)}
            variant="video"
            width={300}
          >
            <VideoPlayer title="女孩踢球" />
          </BaseWindow>
        );
      case 'promo':
        return (
          <BaseWindow
            key={windowId}
            isOpen={true}
            onClose={() => onCloseWindow(windowId as WindowKey)}
            defaultPosition={{ 
              x: (9.375 + offsetValue) * 16,
              y: (12 + offsetValue) * 16
            }}
            onFocus={() => handleWindowFocus(windowId)}
            zIndex={getWindowZIndex(windowId)}
            width={378}
          >
            <PromoWindow />
          </BaseWindow>
        );
      case 'features':
        return (
          <BaseWindow
            key={windowId}
            isOpen={true}
            onClose={() => onCloseWindow(windowId as WindowKey)}
            defaultPosition={{ 
              x: (18 + offsetValue) * 16,
              y: (6.25 + offsetValue) * 16
            }}
            onFocus={() => handleWindowFocus(windowId)}
            zIndex={getWindowZIndex(windowId)}
            width={600}
          >
            <FeaturesWindow />
          </BaseWindow>
        );
      case 'download':
        return (
          <BaseWindow
            key={windowId}
            isOpen={true}
            onClose={() => onCloseWindow(windowId as WindowKey)}
            defaultPosition={{ 
              x: (20 + offsetValue) * 16,
              y: (7.5 + offsetValue) * 16
            }}
            onFocus={() => handleWindowFocus(windowId)}
            zIndex={getWindowZIndex(windowId)}
            width={300}
          >
            <DownloadWindow />
          </BaseWindow>
        );
      default:
        return null;
    }
  };

  // 当窗口打开时，将其添加到层级顺序中
  React.useEffect(() => {
    setWindowOrder(prev => {
      const newOrder = prev.filter(id => openWindows.includes(id as WindowKey));
      const addedWindows = openWindows.filter(id => !prev.includes(id as string));
      return [...newOrder, ...addedWindows];
    });
  }, [openWindows]);

  return (
    <DesktopContainer>
      {openWindows.map((windowId, index) => renderWindow(windowId, index))}
    </DesktopContainer>
  );
};

const DesktopContainer = styled.main`
  margin-left: 7.5rem;
  min-height: 100vh;
  position: relative;
`;

const WindowContent = styled.div`
  background: var(--bg-white);
  color: var(--text-primary);
  padding: var(--spacing-md);
  font-family: var(--font-pixel);
  line-height: 1.6;
  border: 0.125rem solid var(--line);
  border-radius: 0.5rem;
  min-width: 20rem;
  min-height: 12.5rem;
  max-width: calc(50vw - 5.625rem);
  max-height: calc(100vh - 6.25rem);
  overflow: auto;
`;

const ComingSoonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 18.75rem;
  text-align: center;

  .coming-soon-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 2rem;
    font-weight: bold;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    margin-bottom: 2rem;
    
    span {
      display: block;
    }
  }
  
  .pixel-ball {
    font-size: 3rem;
    margin: 1.5rem 0;
    animation: bounce 1s infinite;
  }
  
  p {
    font-size: 1rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-0.625rem); }
  }
`;

export default Desktop; 