import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { qraftAPIClient } from '@openapi-qraft/react';

import projectConfig from '../core/config/project-config';
import { handleApiError } from '../core/errors/ui-log/global-api-error-handler';
import { createDynamicSecureRequestFn } from './create-secure-request-function';
import {
  _globalRecentlyCaptured,
  _pruneGlobalDedupe,
  captureApiException,
} from '../core/utils/sentry-utils';

interface EnrichedError extends Error {
  __api_request_meta?: {
    apiResponse?: unknown;
    fingerprint?: string;
  };
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: unknown) => {
      const enrichedErr = err as EnrichedError;

      handleApiError(enrichedErr, enrichedErr.__api_request_meta?.apiResponse);

      _pruneGlobalDedupe();
      const fingerprint = enrichedErr.__api_request_meta?.fingerprint ?? enrichedErr.message;

      if (!_globalRecentlyCaptured.has(fingerprint)) {
        _globalRecentlyCaptured.set(fingerprint, Date.now());
        captureApiException(enrichedErr);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err: unknown) => {
      const enrichedErr = err as EnrichedError;
      handleApiError(enrichedErr, enrichedErr.__api_request_meta?.apiResponse);
      captureApiException(enrichedErr);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const api = qraftAPIClient(
  {
    baseUrl: projectConfig.AUTH_API.url,
    requestFn: createDynamicSecureRequestFn(),
  },
  {},
);
