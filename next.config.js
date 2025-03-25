/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    domains: [], // 添加允许的图片域名
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },

  // 构建优化
  compiler: {
    // 移除 console.log
    removeConsole: process.env.NODE_ENV === 'production',
    // 启用 styled-components SSR 和 displayName
    styledComponents: true,
  },

  // 启用 gzip 压缩
  compress: true,

  // 缓存优化
  onDemandEntries: {
    // 页面保持在内存中的时间（ms）
    maxInactiveAge: 25 * 1000,
    // 同时保持在内存中的页面数
    pagesBufferLength: 2,
  },

  // webpack 配置
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev) {
      // 启用 CSS 优化
      config.optimization.minimize = true;
      
      // 启用模块连接
      config.optimization.concatenateModules = true;
      
      // 启用作用域提升
      config.optimization.usedExports = true;
      
      // 分割代码块
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          // 抽取第三方模块
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /[\\/]node_modules[\\/]/,
            priority: 40,
            enforce: true,
          },
          // 抽取公共组件
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          // 抽取样式
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
          },
          // 添加路由级别缓存
          routes: {
            name: 'routes',
            test: /pages[\\/].*\.[jt]sx?$/,
            chunks: 'all',
            priority: 30,
          },
          // 添加组件级别缓存
          components: {
            name: 'components',
            test: /components[\\/].*\.[jt]sx?$/,
            chunks: 'all',
            priority: 25,
          },
          // 添加样式缓存
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
            priority: 35,
          }
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;