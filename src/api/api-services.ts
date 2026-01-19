// src/api/api-services.ts

// 1. Import the 'queryClient' instance directly
import { queryClient } from './query-client-setup';

// 2. Import the request function factory
import { createDynamicSecureRequestFn } from './create-secure-request-function';

// 3. Import your configuration
import projectConfig from '../core/config/project-config';

// 4. Import the generated factory
import { createAPIClient as createAuthHooks } from './services/auth';

/**
 * Instead of passing the 'api' object from query-client-setup,
 * we pass the actual configuration object that createAPIClient requires.
 */
export const authApi = createAuthHooks({
  queryClient, // Required by TanStack Query plugin
  baseUrl: projectConfig.AUTH_API.url,
  requestFn: createDynamicSecureRequestFn(), // The function that adds tokens/trace-id
});

/**
 * Example for adding more services later:
 *
 * import { createAPIClient as createDashboardHooks } from './services/dashboard';
 * export const dashboardApi = createDashboardHooks({
 *   queryClient,
 *   baseUrl: projectConfig.DASHBOARD_API.url,
 *   requestFn: createDynamicSecureRequestFn(),
 * });
 */
