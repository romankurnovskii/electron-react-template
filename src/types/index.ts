// src/types/index.ts
// Global TypeScript types and interfaces
//
// Add types here:
// - user.ts         - User related types
// - api.ts          - API response types
// - electron.ts     - Electron specific types
// - etc.

// Example:
// export * from './user';
// export * from './api';
// export * from './electron';

// Re-export commonly used types (defined below)

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> = T extends (...args: unknown[]) => Promise<infer R> ? R : never;

/**
 * Electron API exposed to renderer
 */
export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
}
