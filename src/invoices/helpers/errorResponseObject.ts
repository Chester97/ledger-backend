type params = {
  message: string;
  status?: string;
};

export function errorResponseObject(message: string): params {
  return {
    message,
    status: 'FAILED',
  };
}
