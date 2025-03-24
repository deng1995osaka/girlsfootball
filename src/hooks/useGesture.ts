import { useEffect, useRef } from 'react';

interface GestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  threshold?: number; // 滑动阈值
  preventDefault?: boolean;
}

export const useGesture = (options: GestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    threshold = 50,
    preventDefault = true
  } = options;

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isTouching = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
      
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      isTouching.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching.current) return;
      
      const deltaX = e.touches[0].clientX - touchStartX.current;
      const deltaY = e.touches[0].clientY - touchStartY.current;
      
      // 判断滑动方向
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouching.current) return;
      
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime.current;
      
      // 判断是否为点击
      if (touchDuration < 300 && onTap) {
        onTap();
      }
      
      isTouching.current = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: !preventDefault });
    document.addEventListener('touchmove', handleTouchMove, { passive: !preventDefault });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, threshold, preventDefault]);
}; 