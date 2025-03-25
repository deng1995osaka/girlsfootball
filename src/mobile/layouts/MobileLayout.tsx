'use client';

import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import Loading from '../../components/UI/Loading';
import { useGesture } from '../../hooks/useGesture';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { usePreloadComponent } from '../../hooks/usePreloadComponent';
import {
  LazyMobileVideo,
  LazyMobileFeatures,
  LazyMobilePromo,
  LazyMobileDownload
} from './LazyMobileComponents';
import MobileVideo from '../pages/MobileVideo';
import MobileFeatures from '../pages/MobileFeatures';
import MobilePromo from '../pages/MobilePromo';
import MobileDownload from '../pages/MobileDownload';

type TabKey = 'video' | 'promo' | 'features' | 'download';

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

interface ItemLabelProps {
  children?: React.ReactNode;
  className?: string;
}

const WINDOW_LABELS: Record<TabKey, { en: string; zh: { prefix?: string; content: string; suffix?: string } }> = {
  promo: { en: 'ABOUT', zh: { content: '我的故事' } },
  features: { en: 'FEATURES', zh: { content: '功能介绍' } },
  video: { en: 'INTRO', zh: { content: '开球!' } },
  download: { en: 'DOWNLOAD', zh: { content: '下载' } }
};

const StarIcon = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  position: relative;
  display: inline-block;
  color: var(--text-primary);
  margin: 0 0.125rem;
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

const TextLabel = styled.span`
  font-family: var(--font-pixel);
  display: inline-block;
  color: var(--text-primary);
  letter-spacing: 0.125rem;
  line-height: 1;
`;

const DecorativeLabel = styled.span<ItemLabelProps>`
  font-family: var(--font-retro);
  font-size: 0.625rem;
  color: var(--text-secondary);
  opacity: 0.6;
  letter-spacing: 0.0625rem;
  text-align: center;
  display: inline-block;
`;

const ChineseLabel = styled.span<ItemLabelProps>`
  font-family: var(--font-pixel);
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: regular;
  text-align: center;
  display: inline-block;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  pointer-events: none;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--bg-white);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.header`
  background: var(--bg-gray);
  
  box-shadow: 
    inset -1px -1px 0 0 #fff,
    inset 1px 1px 0 0 #000;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
`;

const Screen = styled.main`
  flex: 1;
  background: var(--bg-white);
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: calc(100vh - 2.75rem);
  
  /* 隐藏滚动条但保持可滚动 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(var(--line) 1px, transparent 1px);
    background-size: 0.25rem 0.25rem;
    background-position: -0.0625rem -0.0625rem;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const NavBar = styled.nav`
  height: 3.125rem;
  display: flex;
  width: 100%;
  padding: 0;
`;

const NavButton = styled.button.attrs({ type: 'button' })<NavButtonProps>`
  background: var(--bg-gray);
  border: none;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  flex: 1;
  color: var(--text-primary);
  font-family: var(--font-pixel);
  font-size: 0.875rem;
  position: relative;
  transition: all 0.1s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  outline: none;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: -1;
  }
  
  box-shadow: 
    inset -1px -1px 0 0 #000,
    inset 1px 1px 0 0 #fff,
    inset -2px -2px 0 0 #555,
    inset 2px 2px 0 0 #e0e0e0;
  
  &:active {
    box-shadow: 
      inset 1px 1px 0 0 #000,
      inset -1px -1px 0 0 #fff,
      inset 2px 2px 0 0 #555,
      inset -2px -2px 0 0 #e0e0e0;
    
    ${DecorativeLabel}, ${ChineseLabel}, ${StarIcon}, ${TextLabel} {
      transform: translate(0.0625rem, 0.0625rem);
    }

    ${StarIcon} {
      transform: translate(0.0625rem, 0.0625rem) rotate(35deg);
    }
    
    &::after {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  ${props => props.isActive && `
    background: #e0e0e0;
    box-shadow: 
      inset 1px 1px 0 0 #000,
      inset -1px -1px 0 0 #fff,
      inset 2px 2px 0 0 #555,
      inset -2px -2px 0 0 #e0e0e0;
  `}
`;

const MobileLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('promo');

  const tabs: TabKey[] = ['promo', 'features', 'video', 'download'];

  // 预加载函数
  const preloadVideo = usePreloadComponent(() => import('../pages/MobileVideo'));
  const preloadPromo = usePreloadComponent(() => import('../pages/MobilePromo'));
  const preloadFeatures = usePreloadComponent(() => import('../pages/MobileFeatures'));
  const preloadDownload = usePreloadComponent(() => import('../pages/MobileDownload'));

  const handleSwipeLeft = () => {
    setActiveTab(prev => {
      const currentIndex = tabs.indexOf(prev);
      return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : prev;
    });
  };

  const handleSwipeRight = () => {
    setActiveTab(prev => {
      const currentIndex = tabs.indexOf(prev);
      return currentIndex > 0 ? tabs[currentIndex - 1] : prev;
    });
  };

  useGesture({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 50,
    preventDefault: false
  });

  const handleTabClick = (key: TabKey) => {
    setActiveTab(key);
    // 预加载下一个可能的组件
    const currentIndex = tabs.indexOf(key);
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1];
      switch (nextTab) {
        case 'video':
          preloadVideo();
          break;
        case 'promo':
          preloadPromo();
          break;
        case 'features':
          preloadFeatures();
          break;
        case 'download':
          preloadDownload();
          break;
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'video':
        return (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <LazyMobileVideo />
            </Suspense>
          </ErrorBoundary>
        );
      case 'promo':
        return (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <LazyMobilePromo />
            </Suspense>
          </ErrorBoundary>
        );
      case 'features':
        return (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <LazyMobileFeatures />
            </Suspense>
          </ErrorBoundary>
        );
      case 'download':
        return (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <LazyMobileDownload />
            </Suspense>
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <NavBar>
          {Object.entries(WINDOW_LABELS).map(([key, label]) => (
            <NavButton
              key={key}
              isActive={activeTab === key}
              onClick={() => handleTabClick(key as TabKey)}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <LabelWrapper>
                <DecorativeLabel>{label.en}</DecorativeLabel>
                <ChineseLabel>
                  {label.zh.prefix && <TextLabel>{label.zh.prefix}</TextLabel>}
                  <TextLabel>{label.zh.content}</TextLabel>
                </ChineseLabel>
              </LabelWrapper>
            </NavButton>
          ))}
        </NavBar>
      </Header>
      <Screen>
        {renderContent()}
      </Screen>
    </Container>
  );
};

export default MobileLayout; 