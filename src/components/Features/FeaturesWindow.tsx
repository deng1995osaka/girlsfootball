import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Content,
  Preview,
  EndLine,
  AnimatedFeatureBox,
  Divider,
  DescriptionBox
} from './FeaturesWindow.styles';
import Typewriter from '../UI/Typewriter';
import AdaptiveTitle from '../UI/AdaptiveTitle';

/**
 * FeaturesWindow 组件
 * 展示网站主要功能模块的窗口组件
 * 包含三个主要功能模块：球队、动态和球员卡
 * 每个模块都包含标题、副标题、功能列表和预览图
 * 响应式设计：在移动端垂直排列，桌面端采用两列布局
 */
const FeaturesWindow: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([false, false, false]);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showEndLine, setShowEndLine] = useState(false);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleFeatures(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowEndLine(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (endLineRef.current) {
      observer.observe(endLineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFirstTextComplete = () => {
    setShowSecondText(true);
    setVisibleFeatures(prev => {
      const newState = [...prev];
      newState[0] = true;
      return newState;
    });
  };

  return (
    <Container>
      <div>
        <AdaptiveTitle text="踢球·交朋友·一起玩" />
      </div>
      
      <DescriptionBox>
        <div>
          <Typewriter 
            text="不管是5人制还是野球场，"
            speed={80}
            delay={1500}
            onComplete={handleFirstTextComplete}
          />
        </div>
        <div>
          {showSecondText && (
            <Typewriter 
              text="我们都想在绿茵场上奔跑、进球、呐喊。"
              speed={80}
              delay={0}
            />
          )}
        </div>
      </DescriptionBox>

      <Divider />

      {FEATURES_DATA.map((feature, index) => (
        <React.Fragment key={feature.id}>
          <div ref={el => featureRefs.current[index] = el}>
            <AnimatedFeatureBox
              isVisible={visibleFeatures[index]}
              delay={0}
              reverse={index === 1}
            >
              <Content>
                <h2>{feature.title}</h2>
                <h3>{feature.subtitle}</h3>
                <ul>
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </Content>
              <Preview>
                <img 
                  src={feature.preview} 
                  alt={feature.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </Preview>
            </AnimatedFeatureBox>
          </div>
          {index < FEATURES_DATA.length - 1 && <Divider />}
        </React.Fragment>
      ))}

      <div ref={endLineRef}>
        <EndLine>
          {showEndLine && (
            <Typewriter 
              text="★女孩踢球★等你来开球！"
              speed={50}
              delay={0}
            />
          )}
        </EndLine>
      </div>
    </Container>
  );
};

// 功能模块数据
const FEATURES_DATA = [
  {
    id: 'team',
    title: '[FEATURE_01: TEAM]',
    subtitle: 'TEAM STATUS >>>',
    items: [
      '按区域筛选，看看谁在附近踢球',
      '创建你的球队主页',
      '设计像素风队服',
    ],
    preview: '/images/TEAM.png',
  },
  {
    id: 'moments',
    title: '[FEATURE_02: MOMENTS]',
    subtitle: 'MEMORY LOADING >>>',
    items: [
      '记录每次相聚',
      '分享日常训练',
      '发布你的球场故事'
    ],
    preview: '/images/MOMENTS.png',
  },
  {
    id: 'player',
    title: '[FEATURE_03: PLAYER]',
    subtitle: 'PLAYER CARD >>>',
    items: [
      '定制专属PLAYER卡片',
      '选择场上位置',
      '查看你的小报和球队'
    ],
    preview: '/images/PLAYER.png',
  }
];

export default FeaturesWindow; 
