import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import './styles/style.css';
import './styles/global.scss';

import { queryClient } from './core/react-query/query-client';
import { AppInitializer } from './core/auth/app-initializer';
import App from './App';
import { ErrorBoundary } from './core/errors/error-boundary';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <App />
        </AppInitializer>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
