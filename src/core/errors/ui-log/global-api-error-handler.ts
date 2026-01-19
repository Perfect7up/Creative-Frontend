import { areStringsSimilar } from './string';

type SystemErrorFn = (title: string, detail: string) => void;
let _systemErrorFn: SystemErrorFn | null = null;
let _lastErrorSnapshot = { title: '', ts: 0 };

export const registerSystemErrorHandler = (fn: SystemErrorFn) => {
  _systemErrorFn = fn;
};

export const handleApiError = (err: any, apiResponse?: any) => {
  const title = apiResponse?.title ?? err.message ?? 'API Error';
  const detail = apiResponse?.detail ?? '';
  const now = Date.now();

  // Deduplication logic to prevent toast spam
  if (areStringsSimilar(title, _lastErrorSnapshot.title) && now - _lastErrorSnapshot.ts < 5000) {
    return;
  }

  _lastErrorSnapshot = { title, ts: now };
  if (_systemErrorFn) _systemErrorFn(title, detail);
};
