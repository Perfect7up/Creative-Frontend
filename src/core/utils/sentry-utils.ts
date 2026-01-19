import * as Sentry from '@sentry/react';

export const _globalRecentlyCaptured = new Map<string, number>();

export function _pruneGlobalDedupe() {
  const now = Date.now();
  for (const [k, ts] of _globalRecentlyCaptured.entries()) {
    if (now - ts > 5000) _globalRecentlyCaptured.delete(k);
  }
}

export async function captureApiException(error: any) {
  Sentry.withScope((scope) => {
    const meta = error.__api_request_meta;
    if (meta) {
      scope.setContext('api_details', {
        url: meta.schema?.url,
        method: meta.schema?.method,
        response: meta.apiResponse,
      });
      scope.setTag('api_fingerprint', meta.fingerprint);
    }
    Sentry.captureException(error);
  });
}
