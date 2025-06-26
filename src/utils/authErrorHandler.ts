
export const getErrorMessage = (error: string | { message: string } | null | undefined): string => {
  if (!error) return 'Unknown error occurred';
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error.message) return error.message;
  return 'Unknown error occurred';
};
