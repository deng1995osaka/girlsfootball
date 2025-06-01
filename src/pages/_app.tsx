import type { AppProps } from 'next/app'
import { GlobalStyles } from '../styles/GlobalStyles'
import Head from 'next/head'
import '../i18n'  // 导入 i18n 配置
import { LanguageSwitcher } from '../components/LanguageSwitcher';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 缓存控制 */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        {/* 预连接到关键域名 */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/fonts/fusion-pixel.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/edundot.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        
        {/* 预加载关键图片 */}
        <link rel="preload" href="/images/video-cover.webp" as="image" type="image/webp" />
        <link rel="preload" href="/video-cover.gif" as="image" type="image/gif" />
      </Head>
      {/* 全局语言切换按钮，右下角浮动 */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
        <LanguageSwitcher />
      </div>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 