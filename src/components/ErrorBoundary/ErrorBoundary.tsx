import { Component, ErrorInfo, ReactNode } from 'react';
import FallBack from '@/components/FallBack/FallBack';

interface ErrorBoundaryProps {
  children: ReactNode | string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Caught an Error with ErrorBoundary');
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallBack btnHandler={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
