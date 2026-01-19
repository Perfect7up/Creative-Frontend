export const getErrorMessage = (err: any): string | null => {
  if (!err) return null;
  const body = err.body || err?.__api_request_meta?.apiResponse || err;
  const isGenericTitle = (msg: string) =>
    msg?.toLowerCase().includes('one or more errors occurred') ||
    msg?.toLowerCase().includes('validation errors occurred');
  if (body?.errors && typeof body.errors === 'object') {
    const errorEntries = Object.values(body.errors);
    if (errorEntries.length > 0) {
      const messages = errorEntries.flat();
      if (messages.length > 0 && typeof messages[0] === 'string') {
        return messages[0];
      }
    }
  }

  const specificDetail = body?.Message || body?.message || body?.detail;
  if (specificDetail && typeof specificDetail === 'string' && !isGenericTitle(specificDetail)) {
    return specificDetail;
  }
  const status = err.status || body?.status || err?.__api_request_meta?.apiResponse?.status;

  if (status === 401) return 'Invalid email or password.';
  if (status === 403) return 'Account not verified. Please check your email inbox.';
  if (status === 409) return 'This information is already in use by another account.';
  if (status === 400) return 'The request is invalid. Please check your inputs.';

  const rawMessage = body?.title || err.message;
  if (rawMessage && typeof rawMessage === 'string' && !isGenericTitle(rawMessage)) {
    return rawMessage;
  }

  return 'An unexpected error occurred. Please try again later.';
};
