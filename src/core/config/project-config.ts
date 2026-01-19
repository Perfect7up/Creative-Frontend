export const projectConfig = {
  ENVIRONMENT: import.meta.env.VITE_APP_ENV || 'dev',
  AUTH_API: {
    url: import.meta.env.VITE_AUTH_API_URL || import.meta.env.VITE_API_URL,
  },
} as const;

export default projectConfig;
