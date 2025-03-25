import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh">
        <Head>
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
            href="/fonts/pixel-font.ttf" 
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