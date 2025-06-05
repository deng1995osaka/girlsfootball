import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh">
        <Head>
          {/* Favicon 配置 */}
          <link rel="icon" type="image/webp" href="/icons/favicon.webp" />
          <link rel="apple-touch-icon" href="/icons/favicon.webp" />
          <meta name="theme-color" content="#E67E22" />
          
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
            media="print"
            onLoad={(e) => {
              const target = e.currentTarget as HTMLLinkElement;
              target.media = 'all';
            }}
          />
          <link 
            href="/fonts/fusion-pixel.ttf" 
            rel="preload" 
            as="font" 
            type="font/ttf" 
            crossOrigin="anonymous" 
          />
          <link 
            href="/fonts/edundot.ttf" 
            rel="preload" 
            as="font" 
            type="font/ttf" 
            crossOrigin="anonymous" 
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument 