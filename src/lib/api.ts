export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const api = `${API_BASE_URL}/api`;
export const uploads = `${API_BASE_URL}/uploads`;

export interface requestConfigOptions<T> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: T;
  isFormData?: boolean;
  cache?: RequestCache;
}

export const requestConfig = <T = unknown>({
  method,
  data,
  isFormData,
  cache,
}: requestConfigOptions<T>) => {
  const config: RequestInit = {
    method,
    credentials: 'include',
    cache,
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
