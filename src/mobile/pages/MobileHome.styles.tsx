import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 2.75rem);
  background: var(--background-color);
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  color: var(--text-primary);
  text-align: center;
  margin: 0;
  padding: 0.5rem 0;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
  text-align: center;
  max-width: 30rem;
  margin: 0 auto;
  white-space: pre-line;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 20rem;
`;

export const Button = styled.button`
  background: var(--primary);
  color: var(--text-primary);
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`; 