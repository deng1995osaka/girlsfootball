import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, style, ...props }) => {
  // 直接将路径转换为 WebP
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  
  const defaultStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    ...style
  };

  return (
    <img 
      src={webpSrc} 
      alt={alt} 
      style={defaultStyle} 
      {...props} 
    />
  );
};

export default OptimizedImage; 