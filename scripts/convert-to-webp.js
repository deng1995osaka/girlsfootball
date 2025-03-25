const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 需要处理的图片目录
const IMAGE_DIRS = [
  'images',
  'icons'
];

// 需要转换的图片格式
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function convertToWebP(filePath) {
  try {
    const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/, '.webp');
    await sharp(filePath)
      .webp({ quality: 80 }) // 80% 的质量通常是最佳平衡点
      .toFile(webpPath);
    console.log(`✅ Converted: ${path.basename(filePath)} -> ${path.basename(webpPath)}`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error);
  }
}

async function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        await convertToWebP(fullPath);
      }
    }
  }
}

async function main() {
  // 检查是否安装了 sharp
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ sharp package is not installed. Please run: npm install sharp');
    process.exit(1);
  }

  console.log('🔄 Starting WebP conversion...');

  for (const dir of IMAGE_DIRS) {
    const fullDir = path.join(PUBLIC_DIR, dir);
    if (fs.existsSync(fullDir)) {
      await processDirectory(fullDir);
    }
  }

  console.log('✨ WebP conversion completed!');
}

main().catch(console.error); 