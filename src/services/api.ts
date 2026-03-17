// src/services/api.ts
// Base API client for making HTTP requests

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * API client options
 */
interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * API response wrapper
 */
interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

/**
 * Base API client for making HTTP requests
 */
export const api = {
  /**
   * Make an API request
   */
  async request<T>(endpoint: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {} } = options;

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          error: data?.message || `HTTP error ${response.status}`,
          status: response.status,
        };
      }

      return { data, status: response.status };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  },

  /**
   * GET request
   */
  get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  },

  /**
   * POST request
   */
  post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  },

  /**
   * PUT request
   */
  put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  },

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  },

  /**
   * DELETE request
   */
  delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  },
};

export default api;
