export const api = 'http://localhost:5001/api';
export const uploads = 'http://localhost:5001/uploads';

export const requestConfig = <T extends object>(
  method: string,
  data?: T,
  isFormData?: boolean
) => {
  const config: RequestInit = {
    method,
    credentials: 'include',
  };

  if (isFormData && data instanceof FormData) {
    config.body = data;
    return config;
  }

  if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
    return config;
  }
  config.headers = {
    'Content-Type': 'application/json',
  };
  config.body = JSON.stringify(data);
  return config;
};
