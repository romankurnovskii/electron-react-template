// src/services/index.ts
// API services and business logic
//
// Add services here:
// - api.ts         - Base API client
// - auth.service.ts - Authentication service
// - storage.service.ts - Data persistence
// - electron.service.ts - Electron IPC bridge
// - etc.

// Example:
// export { api } from './api';
// export { authService } from './auth.service';
// export { storageService } from './storage.service';
// export { electronService } from './electron.service';

// Placeholder - add your service exports here
export const SERVICES = {
  // Add your service exports here
} as const;

// Re-export commonly used services
export { api } from './api';
export { electronService } from './electron.service';
