// src/constants/index.ts
// Application constants

/**
 * App information
 */
export const APP = {
  name: 'Electron React App',
  version: '1.0.0',
  description: 'Cross-platform Desktop App with Electron and React',
} as const;

/**
 * API configuration
 */
export const API = {
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  defaultPage: 1,
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  theme: 'app-theme',
  language: 'app-language',
  authToken: 'auth-token',
  user: 'user-data',
} as const;

/**
 * Route paths
 */
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings',
  about: '/about',
} as const;

/**
 * Date format options
 */
export const DATE_FORMATS = {
  short: { month: 'short', day: 'numeric' },
  medium: { year: 'numeric', month: 'short', day: 'numeric' },
  long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  time: { hour: '2-digit', minute: '2-digit' },
  datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
} as const;
