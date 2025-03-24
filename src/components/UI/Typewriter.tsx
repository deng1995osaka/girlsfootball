import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TypewriterContainer = styled.div<{ className?: string; children?: React.ReactNode }>`
  display: inline-block;
  font-family: var(--font-pixel);
  white-space: pre-wrap;
  word-break: break-word;
  overflow: visible;
  text-overflow: clip;
  max-width: 100%;
  width: fit-content;
  line-height: 1.6;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  animation: ${blink} 0.7s infinite;
  vertical-align: middle;
`;

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay = 0,
  speed = 100,
  onComplete,
  className
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentIndex, text, speed, onComplete]);

  return (
    <TypewriterContainer className={className}>
      {displayText}
      {!isComplete && <Cursor />}
    </TypewriterContainer>
  );
};

export default Typewriter;