// 媒体查询生成器
export const breakpoint = {
  tablet: `@media (min-width: var(--breakpoint-tablet))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
  large: `@media (min-width: var(--breakpoint-large))`
};

// 响应式工具函数
export const responsive = (styles: { [key: string]: string }) => {
  return Object.entries(styles).map(([breakpointKey, value]) => {
    if (breakpointKey === 'base') {
      return value;
    }
    return `${breakpoint[breakpointKey as keyof typeof breakpoint]} { ${value} }`;
  }).join('\n');
}; 