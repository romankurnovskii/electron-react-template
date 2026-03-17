// src/services/electron.service.ts
// Service for communicating with Electron main process via IPC

/**
 * Electron API exposed to renderer
 */
interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  // Add more IPC handlers here as needed
}

/**
 * Get the Electron API (works in both Electron and browser)
 */
function getElectronAPI(): ElectronAPI | null {
  if (typeof window !== 'undefined' && window.electronAPI) {
    return window.electronAPI;
  }
  return null;
}

/**
 * Electron service for IPC communication
 */
export const electronService = {
  /**
   * Get the app version from Electron
   */
  async getAppVersion(): Promise<string> {
    const api = getElectronAPI();
    if (api) {
      return api.getAppVersion();
    }
    // Fallback for browser dev
    return '1.0.0-browser';
  },

  /**
   * Get the platform (darwin, win32, linux)
   */
  async getPlatform(): Promise<string> {
    const api = getElectronAPI();
    if (api) {
      return api.getPlatform();
    }
    // Fallback for browser dev
    return 'browser';
  },

  /**
   * Check if running in Electron
   */
  isElectron(): boolean {
    return getElectronAPI() !== null;
  },
};

export default electronService;

// Type declaration for window.electronAPI
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
