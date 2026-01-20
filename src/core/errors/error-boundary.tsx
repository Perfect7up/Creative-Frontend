import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error);
    console.error('Component stack:', info.componentStack);
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-screen flex-col items-center justify-center gap-4 p-6">
            <h1 className="text-2xl font-bold">Something went wrong</h1>

            <p className="text-sm opacity-70">{this.state.error?.message}</p>

            <button onClick={this.reset} className="rounded bg-blue-600 px-4 py-2 text-white">
              Try again
            </button>

            <button onClick={() => (window.location.href = '/')} className="text-sm underline">
              Go to home
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
