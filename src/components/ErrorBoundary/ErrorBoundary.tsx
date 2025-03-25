import React, { Component, ErrorInfo, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface StyledProps {
  children?: React.ReactNode;
}

const ErrorContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  text-align: center;
  height: 100%;
  min-height: 12.5rem;
`;

const ErrorMessage = styled.div<StyledProps>`
  color: var(--text-primary);
  font-family: var(--font-pixel);
  font-size: 1rem;
  margin-bottom: var(--spacing-md);
`;

const RetryButton = styled.button.attrs({ type: 'button' })<ButtonHTMLAttributes<HTMLButtonElement>>`
  background: var(--primary);
  color: var(--text-primary);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-family: var(--font-pixel);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorMessage>
            加载出错了 (；′⌒`)
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            重试
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
} 