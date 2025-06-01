import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Loading from '../components/UI/Loading';
import { useTranslation } from 'react-i18next';

// 动态导入组件
const Desktop = dynamic(() => import('../components/Layout/Desktop'), {
  ssr: false,
  loading: () => <Loading />
});

const Dock = dynamic(() => import('../components/Layout/Dock'), {
  ssr: true,
  loading: () => <Loading />
});

const MobileLayout = dynamic(
  () => import('../mobile/layouts/MobileLayout'),
  { 
    ssr: false,
    loading: () => <Loading />
  }
);

type WindowKey = 'video' | 'promo' | 'features' | 'download';

const DEFAULT_OPEN_WINDOWS: Record<WindowKey, boolean> = {
  features: true,
  video: true,
  promo: false,
  download: false
};

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [openWindows, setOpenWindows] = useState<Record<WindowKey, boolean>>(DEFAULT_OPEN_WINDOWS);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileDevice(isMobile);
    };

    // 初始检查
    checkDevice();

    // 监听窗口大小变化
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const toggleWindow = (windowId: WindowKey) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: !prev[windowId]
    }));
  };

  const handleWindowClose = (windowId: WindowKey) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: false
    }));
  };

  if (isMobileDevice) {
    return <MobileLayout />;
  }

  const openWindowsList = Object.entries(openWindows)
    .filter(([_, isOpen]) => isOpen)
    .map(([key]) => key as WindowKey);

  return (
    <Container>
      <SiteTitle>
        {i18n.language === 'zh'
          ? t('header.title')
          : t('header.title_en')}
      </SiteTitle>
      <Dock onItemClick={toggleWindow} openWindows={openWindows} />
      <Desktop 
        openWindows={openWindowsList}
        onCloseWindow={handleWindowClose} 
      />
    </Container>
  );
};

const SiteTitle = styled.h1`
  position: fixed;
  top: 20px;
  right: 40px;
  font-size: 36px;
  font-family: var(--font-pixel);
  color: var(--title-color);
  z-index: 1000;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export default HomePage;