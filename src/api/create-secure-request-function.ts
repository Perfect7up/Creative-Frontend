import {
  type HeadersOptions,
  mergeHeaders,
  type OperationSchema,
  requestFn,
  type RequestFnInfo,
  type RequestFnOptions,
  type RequestFnResponse,
} from '@openapi-qraft/react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from '../modules/account/store/auth-store';
import { statusMessages } from '../core/utils/status-code-utils';

export const DEDUP_TTL_MS = 5_000;

/**
 * Interface for the metadata we attach to errors for the Global QueryClient
 */
interface ApiRequestMeta {
  fingerprint: string;
  requestInfo: RequestFnInfo;
  schema: OperationSchema;
  apiResponse: unknown;
}

/**
 * Interface to safely handle enriched error objects without using 'any'
 */
interface EnrichedError extends Error {
  __api_response?: unknown;
  __api_request_meta?: ApiRequestMeta;
  status?: number;
  response?: {
    data?: unknown;
    status?: number;
  };
}

export function createDynamicSecureRequestFn() {
  return async function dynamicSecureRequestFn<TData, TError>(
    schema: OperationSchema,
    requestInfo: RequestFnInfo,
    options?: RequestFnOptions,
  ): Promise<RequestFnResponse<TData, TError>> {
    const token = useAuthStore.getState().accessToken;
    const traceId = uuidv4();

    const finalHeaders = mergeHeaders(requestInfo.headers, {
      Authorization: token ? `Bearer ${token}` : undefined,
      'X-Trace-Id': traceId,
    } as HeadersOptions);

    const updatedRequestInfo: RequestFnInfo = { ...requestInfo, headers: finalHeaders };

    try {
      const res = await requestFn(schema, updatedRequestInfo, options);

      // In openapi-qraft, status is found on the 'response' object, not the top level of 'res'
      const status = res.response?.status;

      if (res.error && typeof status === 'number' && status >= 400) {
        const meta = statusMessages[status] ?? { title: `Error ${status}` };

        if (res.error instanceof Error) {
          const err = res.error as EnrichedError;
          err.message = `${err.message} | ${meta.title}`;
          err.__api_response = res.response;
        }
      }

      return res as RequestFnResponse<TData, TError>;
    } catch (err: unknown) {
      const enrichedErr = err as EnrichedError;

      // Attach metadata for the global QueryClient onError handler
      const apiResponse = enrichedErr?.response?.data ?? enrichedErr;

      enrichedErr.__api_request_meta = {
        fingerprint: `${schema.method.toUpperCase()} ${schema.url} ${enrichedErr.status ?? enrichedErr.response?.status ?? ''}`,
        requestInfo,
        schema,
        apiResponse,
      };

      throw enrichedErr;
    }
  };
}
