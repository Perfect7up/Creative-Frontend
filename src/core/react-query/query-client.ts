import { QueryClient, QueryCache } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error: any) => {
        if (error?.status === 401) return false;

        return count < 2;
      },

      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },

    mutations: {
      retry: 1,
    },
  },

  queryCache: new QueryCache({
    onError: (error: any) => {
      if (error?.status === 401) {
        window.dispatchEvent(new Event('force-logout'));
      }
    },
  }),
});
