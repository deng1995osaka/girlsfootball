import styled from 'styled-components';

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--background-color);
  border-top: 0.125rem solid var(--line);
  padding: 0.5rem;
  z-index: 1000;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const NavLink = styled.a<{ active?: boolean }>`
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  text-decoration: none;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-gray);
  }
`;

export const IconWrapper = styled.span<{ active?: boolean }>`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: ${props => props.active ? 'var(--bg-gray)' : 'transparent'};
  transition: all 0.2s ease;
`; 