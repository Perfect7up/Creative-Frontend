export const statusMessages: Record<number, { title: string; hint?: string }> = {
  400: { title: 'Bad Request', hint: 'The server could not understand the request.' },
  401: { title: 'Unauthorized', hint: 'Please log in again.' },
  403: { title: 'Forbidden', hint: 'You do not have permission to do this.' },
  404: { title: 'Not Found', hint: 'The requested resource was not found.' },
  500: { title: 'Server Error', hint: 'Something went wrong on our end.' },
};
