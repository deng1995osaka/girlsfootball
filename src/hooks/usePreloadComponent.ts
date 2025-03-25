import { useCallback } from 'react';

type LazyComponent = () => Promise<{ default: React.ComponentType<any> }>;

export const usePreloadComponent = (importFn: LazyComponent) => {
  return useCallback(() => {
    try {
      importFn();
    } catch (err) {
      console.error('预加载组件失败:', err);
    }
  }, [importFn]);
}; 