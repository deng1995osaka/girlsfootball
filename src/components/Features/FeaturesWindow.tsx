import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
import OptimizedImage from '../UI/OptimizedImage';

import { LanguageSwitcher } from '../LanguageSwitcher';

/**
 * FeaturesWindow 组件
 * 展示网站主要功能模块的窗口组件
 * 包含三个主要功能模块：球队、动态和球员卡
 * 每个模块都包含标题、副标题、功能列表和预览图
 * 响应式设计：在移动端垂直排列，桌面端采用两列布局
 */
const FeaturesWindow: React.FC = () => {
  const { t } = useTranslation();
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
        <AdaptiveTitle text={t('main.title')} />
      </div>
      
      <DescriptionBox>
        <div>
          <Typewriter 
            text={t('main.subtitle.line1')}
            speed={80}
            delay={1500}
            onComplete={handleFirstTextComplete}
          />
        </div>
        <div>
          {showSecondText && (
            <Typewriter 
              text={t('main.subtitle.line2')}
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
                <h2>{t(`features.${feature.id}.title`)}</h2>
                <h3>{t(`features.${feature.id}.subtitle`)}</h3>
                <ul>
                  {(t(`features.${feature.id}.highlights`, { returnObjects: true }) as string[]).map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </Content>
              <Preview>
                <OptimizedImage 
                  src={feature.preview} 
                  alt={t(`alt.${feature.id}`)} 
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
              text={t('ending')}
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
    subtitle: 'TEAM STATUS >>>',
    preview: '/images/TEAM.webp',
  },
  {
    id: 'moments',
    subtitle: 'MEMORY LOADING >>>',
    preview: '/images/MOMENTS.webp',
  },
  {
    id: 'player',
    subtitle: 'PLAYER CARD >>>',
    preview: '/images/PLAYER.webp',
  }
];

export default FeaturesWindow; 
