import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  font-family: var(--font-pixel);
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--bg-white);
  border-top: 1px solid var(--line);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

const Footer: React.FC = () => {
  const [show备案, setShow备案] = useState(false);

  useEffect(() => {
    // 在客户端环境检查域名
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'girlsfootball.fun') {
        setShow备案(true);
      } else {
        setShow备案(false);
      }
    }
  }, []);

  if (!show备案) {
    return null; // 如果不是指定域名，则不渲染任何内容
  }

  return (
    <FooterContainer>
      <p>©2025 女孩踢球 girlsfootball.fun | 苏ICP备2025170912号-2</p>
      <p>
        <FooterLink 
          href="http://beian.miit.gov.cn/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          点击查看备案信息
        </FooterLink>
      </p>
    </FooterContainer>
  );
};

export default Footer; 