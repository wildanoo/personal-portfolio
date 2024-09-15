import Cookies from 'js-cookie';

const BASE_URL = '/api'; // Sesuaikan dengan base URL API Anda

interface FetchOptions extends RequestInit {
  token?: boolean;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token = true, ...fetchOptions } = options;
  const url = `${BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    ...fetchOptions.headers as Record<string, string>,
  };
  
  if (token) {
    const authToken = Cookies.get('token');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Terjadi kesalahan pada server');
  }

  return response.json() as T;
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions): Promise<T> => 
    fetchAPI<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, data: any, options?: FetchOptions): Promise<T> => 
    fetchAPI<T>(endpoint, { ...options, method: 'POST', body: data }),
  
  put: <T>(endpoint: string, data: any, options?: FetchOptions): Promise<T> => 
    fetchAPI<T>(endpoint, { ...options, method: 'PUT', body: data }),
  
  delete: <T>(endpoint: string, options?: FetchOptions): Promise<T> => 
    fetchAPI<T>(endpoint, { ...options, method: 'DELETE' }),
};