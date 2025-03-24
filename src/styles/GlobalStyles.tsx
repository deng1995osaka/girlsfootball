import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'PixelFont';
    src: url('/fonts/pixel-font.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'EDunDot';
    src: url('/fonts/edundot.ttf') format('truetype');
    font-display: swap;
  }

  :root {
    /* 基准字体大小 */
    --font-size-base: 16px;
    
    @media (max-width: 1200px) {
      --font-size-base: 15px;
    }
    
    @media (max-width: 992px) {
      --font-size-base: 14px;
    }
    
    @media (max-width: 768px) {
      --font-size-base: 13px;
    }
    
    @media (max-width: 576px) {
      --font-size-base: 12px;
    }
    
    /* 间距单位 */
    --spacing-xs: 0.5rem;    /* 8px */
    --spacing-sm: 1rem;      /* 16px */
    --spacing-md: 1.5rem;    /* 24px */
    --spacing-lg: 2rem;      /* 32px */
    --spacing-xl: 3rem;      /* 48px */

    /* 内容区域最大宽度 */
    --content-width-sm: 90%;
    --content-width-md: 768px;
    --content-width-lg: 1024px;

    /* 原有的颜色变量保持不变 */
    --primary: #E67E22;
    --text-primary: #333333;
    --text-secondary: #999999;
    --bg-white: #ffffff;
    --line: #131415;
    --bg-gray: #BCBCBC;
    --background-color: #f5f5f5;
    --window-background: rgba(255, 255, 255, 0.95);
    --window-border: #333333;
    --title-color: #333333;
    --gradient-background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);

    /* 字体变量 */
    --font-pixel: 'PixelFont', monospace;
    --font-edun: 'EDunDot', monospace;
    --font-retro: 'Press Start 2P', cursive;
    --font-mono: 'PixelFont', monospace;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background-color);
    background-image: radial-gradient(var(--line) 1px, transparent 1px);
    background-size: 4px 4px;
    background-position: -1px -1px;
    color: var(--text-primary);
    overflow: hidden;
    font-family: var(--font-pixel);
    font-size: var(--font-size-base);
    line-height: 1.5;
  }

  /* 全局滚动条样式 */
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: var(--bg-gray);
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
    
    &:hover {
      background: #d35400;
    }
  }
`; 