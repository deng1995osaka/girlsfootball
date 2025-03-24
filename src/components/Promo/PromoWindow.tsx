import React, { useState } from 'react';
import AdaptiveTitle from '../UI/AdaptiveTitle';
import styled from 'styled-components';
import Typewriter from '../UI/Typewriter';
import {
  Container,
  StoryBox,
  StoryText,
  Preview,
  JoinBox,
  Content
} from './PromoWindow.styles';

const StarIcon = styled.div`
  width: 12px;
  height: 12px;
  position: relative;
  display: inline-block;
  color: var(--text-primary);
  margin: 0 2px;
  transform: rotate(35deg);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: currentColor;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const SubTitle = styled.div`
  text-align: center;
  font-family: var(--font-pixel);
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  
  display: flex;
  flex-direction: column;
  
`;

const PromoWindow: React.FC = () => {
  const [showSecondText, setShowSecondText] = useState(false);

  const handleFirstTextComplete = () => {
    setShowSecondText(true);
  };

  return (
    <Container>
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
      
      <StoryBox>
        <StoryText>2022年春天，我作为初学者加入了一支业余女足队。</StoryText>
        <StoryText>女孩们教我传球、射门，我们一起踢球，也一起聚餐、爬山、看球赛。</StoryText>
        <StoryText>甚至在一个周末，一起去公园放风筝。</StoryText>
        
        <StoryText>后来，我发现像我们这样的队伍越来越多。</StoryText>
      </StoryBox>

      <Preview>
        <img 
          src="/images/Phone.png" 
          alt="诺基亚短信界面" 
        />
      </Preview>

      <JoinBox>
        <Content>
          <ul>
            <li>如果你也是其中一员，欢迎分享你的足球生活；</li>
            <li>如果你在找她们，现在可以开始了。</li>
          </ul>
        </Content>
      </JoinBox>
    </Container>
  );
};

export default PromoWindow;