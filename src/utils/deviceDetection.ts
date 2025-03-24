export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // 开发环境下，默认显示移动端
  if (process.env.NODE_ENV === 'development') {
    // 通过URL参数控制是否显示PC端
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('pc')) return false;
    return true;
  }
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  ) || window.innerWidth <= 768;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIPad = /ipad/.test(userAgent);
  const isTablet = /tablet/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isWindowsTablet = /tablet pc/i.test(userAgent);
  
  return (
    isIPad ||
    isTablet ||
    (isAndroid && !/mobile/.test(userAgent)) ||
    isWindowsTablet ||
    (window.innerWidth > 768 && window.innerWidth <= 1024)
  );
}; 