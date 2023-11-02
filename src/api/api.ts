import { fetchClientFunction } from '@/api/api.types';

export const fetchData: fetchClientFunction = async (endpoint, payload) => {
  const { body, ...customConfig } = payload ?? {};
  const headers = {
    'Content-Type': 'application/json',
  };
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = body;
  }
  try {
    const response = await fetch(endpoint, config);

    if (!response.ok) {
      return Promise.reject('Failed to fetch');
    }
    return await response.json();
  } catch (e) {
    return Promise.reject((e as Error).message);
  }
};
