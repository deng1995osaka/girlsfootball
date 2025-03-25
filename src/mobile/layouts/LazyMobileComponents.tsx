import { lazy } from 'react';

// 懒加载移动端组件
export const LazyMobileVideo = lazy(() => import('../pages/MobileVideo'));
export const LazyMobileFeatures = lazy(() => import('../pages/MobileFeatures'));
export const LazyMobilePromo = lazy(() => import('../pages/MobilePromo'));
export const LazyMobileDownload = lazy(() => import('../pages/MobileDownload')); 