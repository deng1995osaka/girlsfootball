import React, { Component, ErrorInfo } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  padding: 1rem;
  background: var(--bg-white);
  border-radius: 0.5rem;
  text-align: center;
  font-family: var(--font-pixel);
`;

const ErrorMessage = styled.p`
  color: var(--primary);
  margin: 0.5rem 0;
`;

const RetryButton = styled.button`
  background: var(--primary);
  color: var(--bg-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: var(--font-pixel);
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
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
    console.error('组件错误:', error);
    console.error('错误详情:', errorInfo);
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