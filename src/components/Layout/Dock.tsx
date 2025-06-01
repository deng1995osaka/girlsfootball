import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface DockProps {
  onItemClick: (window: WindowKey) => void;
  activeWindow?: WindowKey;
  openWindows: Record<WindowKey, boolean>;
}

type WindowKey = 'video' | 'promo' | 'features' | 'download';

const StarIcon = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  position: relative;
  display: inline-block;
  color: var(--text-primary);
  margin: 0 0.125rem;
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

const TextLabel = styled.span`
  font-family: var(--font-pixel);
  display: inline-block;
  color: var(--text-primary);
  letter-spacing: 0.125rem;
  line-height: 1;
`;

const SPACING = {
  leftEdge: '0.5rem',
  between: '0.5rem',
  rightEdge: '1rem'
};

const BaseLabel = styled.span<ItemLabelProps>`
  font-family: 'PixelFont', monospace;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-align: center;
  display: inline-block;
`;

const DecorativeLabel = styled.span<ItemLabelProps>`
  font-family: var(--font-retro);
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.6;
  letter-spacing: 0.0625rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-align: center;
  display: inline-block;
`;

const ChineseLabel = styled.span<ItemLabelProps>`
  font-family: var(--font-pixel);
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: regular;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-align: center;
  display: inline-block;
  text-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1);
  white-space: nowrap;
`;

const BUTTON_HEIGHT = {
  base: '5rem',
  perChar: '1.25rem',
  starIcon: '1rem'
};

const NAV_ORDER: WindowKey[] = ['video', 'promo', 'features', 'download'];

const EN_LABELS = {
  video: 'INTRO',
  promo: 'ABOUT',
  features: 'FEATURES',
  download: 'DOWNLOAD'
};

const DECORATIVE_LABELS = {
  video:    { zh: "INTRO", en: "开球!" },
  promo:    { zh: "ABOUT", en: "女孩踢球" },
  features: { zh: "FEATURES", en: "踢球·交朋友·一起玩" },
  download: { zh: "DOWNLOAD", en: "我们球场见" }
};

const Dock: React.FC<DockProps> = ({ onItemClick, activeWindow, openWindows }) => {
  const { t, i18n } = useTranslation();
  const [activeWindowState, setActiveWindow] = React.useState<string>('video');
  const isZh = i18n.language === 'zh';

  const handleItemClick = (windowId: string) => {
    setActiveWindow(windowId);
    onItemClick(windowId as WindowKey);
  };

  return (
    <DockContainer>
      <DockItems>
        {NAV_ORDER.map((key) => (
          <NavButton
            key={key}
            data-key={key as WindowKey}
            onClick={() => handleItemClick(key as WindowKey)}
            isActive={activeWindowState === key}
          >
            <LabelWrapper>
              <DecorativeLabel>{isZh ? DECORATIVE_LABELS[key].zh : DECORATIVE_LABELS[key].en}</DecorativeLabel>
              <ChineseLabel>
                {key === 'promo' && isZh ? (
                  <>
                    <StarIcon />
                    <TextLabel>{t('dock.promo.prefix')}</TextLabel>
                    <StarIcon />
                    <TextLabel>{t('dock.promo.content')}</TextLabel>
                  </>
                ) : key === 'promo' ? (
                  <>
                    <TextLabel>{t('dock.promo.content')}</TextLabel>
                    <br />
                    <StarIcon />
                    <TextLabel>{t('dock.promo.prefix')}</TextLabel>
                    <StarIcon />
                  </>
                ) : (
                  <>
                    <TextLabel>{t(`dock.${key}.content`)}</TextLabel>
                    {t(`dock.${key}.prefix`) && <TextLabel>{t(`dock.${key}.prefix`)}</TextLabel>}
                  </>
                )}
              </ChineseLabel>
            </LabelWrapper>
          </NavButton>
        ))}
      </DockItems>
    </DockContainer>
  );
};

interface ItemLabelProps {
  children?: React.ReactNode;
  className?: string;
}

interface NavButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
  'data-key'?: WindowKey;
}

const NavButton = styled.button.attrs({ type: 'button' })<NavButtonProps>`
  background: var(--bg-gray);
  border: none;
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  flex: 1;
  min-height: 5rem;
  box-shadow: 
    inset -0.0625rem -0.0625rem 0 0 #000,
    inset 0.0625rem 0.0625rem 0 0 #fff,
    inset -0.125rem -0.125rem 0 0 #555,
    inset 0.125rem 0.125rem 0 0 #e0e0e0;

  &:active {
    box-shadow: 
      inset 0.0625rem 0.0625rem 0 0 #000,
      inset -0.0625rem -0.0625rem 0 0 #fff,
      inset 0.125rem 0.125rem 0 0 #555,
      inset -0.125rem -0.125rem 0 0 #e0e0e0;
    
    ${DecorativeLabel}, ${ChineseLabel}, ${StarIcon}, ${TextLabel} {
      transform: translate(0.0625rem, 0.0625rem);
    }

    ${StarIcon} {
      transform: translate(0.0625rem, 0.0625rem) rotate(35deg);
    }
  }
`;

const DockItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const DockContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6.25rem;
  background: var(--bg-gray);
  
  box-shadow: 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  padding: 0;
  overflow: hidden;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding-left: ${SPACING.leftEdge};
  padding-right: ${SPACING.rightEdge};
  gap: ${SPACING.between};
`;

export default Dock;