import React, { useState } from 'react';
import AdaptiveTitle from '../UI/AdaptiveTitle';
import styled from 'styled-components';
import Typewriter from '../UI/Typewriter';
import OptimizedImage from '../UI/OptimizedImage';
import {
  Container,
  StoryBox,
  StoryText,
  Preview,
  JoinBox,
  Content
} from './PromoWindow.styles';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const [showSecondText, setShowSecondText] = useState(false);

  const handleFirstTextComplete = () => {
    setShowSecondText(true);
  };

  return (
    <Container>
      <AdaptiveTitle text={i18n.language === 'zh' ? t('story.title') : t('story.title_en')} />
      
      <SubTitle>
        <div>
          <Typewriter 
            text={t('story.subheadline.line1')}
            speed={80}
            delay={1500}
            onComplete={handleFirstTextComplete}
          />
        </div>
        <div>
          {showSecondText && (
            <Typewriter 
              text={t('story.subheadline.line2')}
              speed={80}
              delay={0}
            />
          )}
        </div>
      </SubTitle>
      
      <StoryBox>
        {(t('story.content', { returnObjects: true }) as string[]).map((line, idx) => (
          <StoryText key={idx}>{line}</StoryText>
        ))}
      </StoryBox>

      <Preview>
        <OptimizedImage 
          src="/images/Phone.png" 
          alt={t('alt.nokia')} 
        />
      </Preview>

      <JoinBox>
        <Content>
          <ul>
            <li>{t('story.invitation.line1')}</li>
            <li>{t('story.invitation.line2')}</li>
          </ul>
        </Content>
      </JoinBox>
    </Container>
  );
};

export default PromoWindow;