export const getErrorMessage = (err: any): string | null => {
  if (!err) return null;

  const apiMessage =
    err?.__api_request_meta?.apiResponse?.Message || err?.__api_request_meta?.apiResponse?.message;

  if (apiMessage) return apiMessage;

  if (err.message && err.message !== 'Buffered' && !err.message.includes('unknown')) {
    return err.message;
  }

  return 'An unexpected error occurred. Please try again.';
};
