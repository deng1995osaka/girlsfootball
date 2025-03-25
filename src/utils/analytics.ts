import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // 累积布局偏移 (CLS)
    onCLS(onPerfEntry);
    // 首次输入延迟 (FID)
    onFID(onPerfEntry);
    // 最大内容绘制 (LCP)
    onLCP(onPerfEntry);
    // 首次内容绘制 (FCP)
    onFCP(onPerfEntry);
    // 首字节时间 (TTFB)
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals; 