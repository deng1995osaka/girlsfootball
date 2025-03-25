import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // 累积布局偏移 (CLS)
    getCLS(onPerfEntry);
    // 首次输入延迟 (FID)
    getFID(onPerfEntry);
    // 最大内容绘制 (LCP)
    getLCP(onPerfEntry);
    // 首次内容绘制 (FCP)
    getFCP(onPerfEntry);
    // 首字节时间 (TTFB)
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals; 