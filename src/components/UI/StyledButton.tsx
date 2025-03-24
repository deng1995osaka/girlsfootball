import styled from 'styled-components';

export const PixelButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3125rem;
  transition: all 0.3s;
  font-family: var(--font-pixel);

  &:hover {
    transform: scale(1.1);
  }
`;

interface CloseButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const CloseButton = styled.button<CloseButtonProps>`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`; 