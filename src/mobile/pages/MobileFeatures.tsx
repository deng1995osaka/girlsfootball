import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Typewriter from '../../components/UI/Typewriter';
import AdaptiveTitle from '../../components/UI/AdaptiveTitle';

const Container = styled.div`
  padding: var(--spacing-sm);
  font-family: var(--font-pixel);
  line-height: 1.6;
  min-height: calc(100vh - 2.75rem);
  display: flex;
  flex-direction: column;
  background: var(--bg-white);
`;

const TitleWrapper = styled.div`
  margin-bottom: 0;
`;

const SubTitle = styled.div`
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  min-height: 1.5rem;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  width: 100%;
  text-align: center;
  margin-top: var(--spacing-sm);
`;

const Status = styled.div`
  margin: 1.25rem 0;
  border-top: 0.0625rem dashed var(--line);
  padding-top: 0.5rem;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface StyledDivProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FeatureBoxWrapper = styled.div<StyledDivProps>`
  padding: 0.9375rem 0.9375rem 0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;

  &.visible {
    animation: ${slideIn} 0.5s ease-out forwards;
  }
`;

const Content = styled.div`
  h2 {
    font-size: 1rem;
    color: var(--primary);
    font-weight: bold;
    margin-bottom: 0.625rem;
  }

  h3 {
    color: var(--text-secondary);
    margin-bottom: 0.625rem;
    font-size: 0.875rem;
    font-weight: normal;
  }

  ul {
    margin: 0.625rem 0;
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.25rem;
      margin: 0.3125rem 0;
      font-family: var(--font-pixel);
      line-height: 1.5;
      font-size: 0.875rem;
      color: var(--text-primary);
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0.25rem;
        height: 0.25rem;
        background: var(--primary);
        transform: translateY(-50%);
      }
    }
  }
`;

const Preview = styled.div`
  width: 100%;
  max-width: 15.625rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    object-fit: contain;
    image-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const EndLine = styled.div<StyledDivProps>`
  margin-top: 1.875rem;
  text-align: center;
  padding-top: 0.625rem;
  color: var(--primary);
  font-weight: bold;
`;

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
    preview: '/images/TEAM.webp',
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
    preview: '/images/MOMENTS.webp',
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
    preview: '/images/PLAYER.webp',
  }
];

const MobileFeatures: React.FC = () => {
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
      <TitleWrapper>
        <AdaptiveTitle text="踢球·交朋友·一起玩" />
        
        <SubTitle>
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
        </SubTitle>
      </TitleWrapper>

      <Status />

      {FEATURES_DATA.map((feature, index) => (
        <React.Fragment key={feature.id}>
          <div ref={el => featureRefs.current[index] = el}>
            <FeatureBoxWrapper 
              className={visibleFeatures[index] ? 'visible' : ''}
              style={{ animationDelay: `${index * 800}ms` }}
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
                <img src={feature.preview} alt={feature.title} />
              </Preview>
            </FeatureBoxWrapper>
          </div>
          {index < FEATURES_DATA.length - 1 && <Status />}
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

export default MobileFeatures; 