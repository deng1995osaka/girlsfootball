import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Button = styled.button`
  background: var(--bg-white);
  border: 1.5px solid var(--primary);
  color: var(--primary);
  cursor: pointer;
  font-size: 1rem;
  font-family: var(--font-pixel);
  padding: 0.3rem 1rem;
  border-radius: 0.4rem;
  box-shadow: 1.5px 1.5px 0 0 var(--line);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: fixed;
  right: 1.5rem;
  bottom: 1.2rem;
  z-index: 1000;

  &:hover {
    background: var(--primary);
    color: var(--bg-white);
    box-shadow: 2.5px 2.5px 0 0 var(--primary);
  }
`;

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    
    i18n.changeLanguage(newLang as 'en' | 'zh');

  };

  return (
    <Button onClick={toggleLanguage}>
      {i18n.language === 'zh' ? 'EN' : '中文'}
    </Button>
  );
}; 