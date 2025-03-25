import type { AppProps } from 'next/app'
import { GlobalStyles } from '../styles/GlobalStyles'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 缓存控制 */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        {/* 预连接到关键域名 */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/fonts/pixel-font.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/edundot.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        
        {/* 预加载关键图片 */}
        <link rel="preload" href="/images/video-cover.webp" as="image" type="image/webp" />
        <link rel="preload" href="/video-cover.gif" as="image" type="image/gif" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 