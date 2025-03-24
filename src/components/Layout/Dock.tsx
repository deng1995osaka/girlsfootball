import React from 'react';
import styled from 'styled-components';

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

const WINDOW_LABELS: Record<WindowKey, { en: string; zh: { prefix?: string; content: string; suffix?: string } }> = {
  video: { en: 'INTRO', zh: { content: '开球!' } },
  promo: { en: 'ABOUT', zh: { content: '女孩踢球', prefix: '的故事' } },
  features: { en: 'FEATURES', zh: { content: '踢球·交朋友·一起玩' } },
  download: { en: 'DOWNLOAD', zh: { content: '我们球场见' } }
};

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
`;

const BUTTON_HEIGHT = {
  base: '5rem',
  perChar: '1.25rem',
  starIcon: '1rem'
};

const Dock: React.FC<DockProps> = ({ onItemClick, activeWindow, openWindows }) => {
  const [activeWindowState, setActiveWindow] = React.useState<string>('video');

  const handleItemClick = (windowId: string) => {
    setActiveWindow(windowId);
    onItemClick(windowId as WindowKey);
  };

  return (
    <DockContainer>
      <DockItems>
        {Object.entries(WINDOW_LABELS).map(([key, label]) => (
          <NavButton
            key={key}
            data-key={key as WindowKey}
            onClick={() => handleItemClick(key as WindowKey)}
            isActive={activeWindowState === key}
          >
            <LabelWrapper>
              <DecorativeLabel>{label.en}</DecorativeLabel>
              <ChineseLabel>
                {key === 'promo' && <StarIcon />}
                <TextLabel>{label.zh.content}</TextLabel>
                {key === 'promo' && <StarIcon />}
                {label.zh.prefix && <TextLabel>{label.zh.prefix}</TextLabel>}
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
  min-height: ${props => {
    const key = props['data-key'];
    const label = WINDOW_LABELS[key as WindowKey];
    // 计算内容字符数
    const contentLength = label.zh.content.length;
    // 计算前缀字符数（如果有的话）
    const prefixLength = label.zh.prefix ? label.zh.prefix.length : 0;
    // 如果是 promo 按钮，加上两个星形图标的高度
    const starsHeight = key === 'promo' ? 2 : 0;
    
    // 将字符串值转换为数字进行计算
    const baseHeight = parseFloat(BUTTON_HEIGHT.base);
    const perCharHeight = parseFloat(BUTTON_HEIGHT.perChar);
    const starIconHeight = parseFloat(BUTTON_HEIGHT.starIcon);
    
    return `${baseHeight + (contentLength + prefixLength) * perCharHeight + starsHeight * starIconHeight}rem`;
  }};
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