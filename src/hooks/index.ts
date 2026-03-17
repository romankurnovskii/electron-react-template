// src/hooks/index.ts
// Custom React hooks
//
// Add custom hooks here:
// - useAuth.ts       - Authentication state
// - useLocalStorage.ts - Persist state to localStorage
// - useDebounce.ts   - Debounce value changes
// - useWindowSize.ts - Window dimensions
// - etc.

// Example:
// export { useAuth } from './useAuth';
// export { useLocalStorage } from './useLocalStorage';
// export { useDebounce } from './useDebounce';

// Re-export common hooks
export { default as useLocalStorage } from './useLocalStorage';
export { default as useDebounce } from './useDebounce';
