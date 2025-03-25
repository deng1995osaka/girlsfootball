import React, { useState } from 'react';
import styled from 'styled-components';
import AdaptiveTitle from '../../components/UI/AdaptiveTitle';
import Typewriter from '../../components/UI/Typewriter';
import OptimizedImage from '../../components/UI/OptimizedImage';

const Container = styled.div`
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  min-height: calc(100vh - 2.75rem);
`;

const TitleWrapper = styled.div`
  margin-bottom:0;
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

const StoryBox = styled.div`
  position: relative;
  padding: var(--spacing-sm);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  &::before {
    content: '';
    position: absolute;
    top: -0.625rem; /* -10px -> -0.625rem */
    left: 0;
    width: 100%;
    border-top: 1px dashed var(--line);
  }
`;

const StoryText = styled.p`
  font-family: var(--font-pixel);
  line-height: 1.8;
  font-size: 0.875rem; /* 14px -> 0.875rem */
  margin: 0;
  color: var(--text-primary);
`;

const Preview = styled.div`
  width: 100%;
  max-width: 15.625rem; /* 250px -> 15.625rem */
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0.9375rem; /* 15px -> 0.9375rem */
  border-radius: 0.75rem; /* 12px -> 0.75rem */
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
    image-rendering: auto;
    transform: scale(0.95);
    transform-origin: center;
    filter: contrast(1.1);
  }
`;

const JoinBox = styled.div`  margin: var(--spacing-lg) 0;
  padding: var(--spacing-lg) var(--spacing-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  text-align: center;
  position: relative;
  border-radius: 0.5rem;
  
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    border-top: 1px dashed var(--line);
  }
  
  &::before {
    top: 0.5rem;
  }
  
  &::after {
    bottom: 0.5rem;
  }
`;

const Content = styled.div`
  width: 100%;
  
  ul {
    margin: 10px 0;
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 20px;
      margin: 5px 0;
      font-family: var(--font-pixel);
      line-height: 1.5;
      font-size: 14px;
      color: var(--text-primary);
      text-align: left;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 4px;
        height: 4px;
        background: var(--primary);
        transform: translateY(-50%);
      }
    }
  }
`;

const MobilePromo: React.FC = () => {
  const [showSecondText, setShowSecondText] = useState(false);

  const handleFirstTextComplete = () => {
    setShowSecondText(true);
  };

  return (
    <Container>
      <TitleWrapper>
        <AdaptiveTitle text="★女孩踢球★的故事" />
        
        <SubTitle>
          <div>
            <Typewriter 
              text="别问能不能踢，"
              speed={80}
              delay={1500}
              onComplete={handleFirstTextComplete}
            />
          </div>
          <div>
            {showSecondText && (
              <Typewriter 
                text="先上场再说。"
                speed={80}
                delay={0}
              />
            )}
          </div>
        </SubTitle>
      </TitleWrapper>
      
      <StoryBox>
        <StoryText>2022年春天，我作为初学者加入了一支业余女足队。</StoryText>
        <StoryText>女孩们教我传球、射门，我们一起踢球，也一起聚餐、爬山、看球赛。</StoryText>
        <StoryText>甚至在一个周末，一起去公园放风筝。</StoryText>
        <StoryText>后来，我发现像我们这样的队伍越来越多。</StoryText>
      </StoryBox>

      <Preview>
        <OptimizedImage 
          src="/images/Phone.png" 
          alt="诺基亚短信界面" 
        />
      </Preview>

      <JoinBox>
        <Content>
          <ul>
            <li>如果你也是其中一员，欢迎分享你的足球生活；</li>
            <li>如果你在找她们，现在可以和她们一起踢了。</li>
          </ul>
        </Content>
      </JoinBox>
    </Container>
  );
};

export default MobilePromo; 
