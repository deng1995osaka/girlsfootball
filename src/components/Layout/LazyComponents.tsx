import { lazy } from 'react';

// 懒加载窗口组件
export const LazyVideoPlayer = lazy(() => import('../VideoPlayer/VideoPlayer'));
export const LazyPromoWindow = lazy(() => import('../Promo/PromoWindow'));
export const LazyFeaturesWindow = lazy(() => import('../Features/FeaturesWindow'));
export const LazyDownloadWindow = lazy(() => import('../Download/DownloadWindow')); 