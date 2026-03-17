import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, screen } from 'electron';
import * as path from 'path';

// Check if running in development mode
const isDev = !app.isPackaged;

let mainWindow: Electron.BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload/preload.ts'),
    },
    titleBarStyle: 'hiddenInset',
    show: false,
    frame: true, // Show frame initially for desktop mode
  });

  // Load the app
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  // Use a simple placeholder icon for development
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show App', 
      click: () => {
        mainWindow?.show();
      } 
    },
    { 
      label: 'Settings', 
      click: () => {
        mainWindow?.show();
        mainWindow?.webContents.send('navigate', '/settings');
      } 
    },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]);

  tray.setToolTip('Electron React Vite');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide();
    } else {
      showWindowAtTray();
    }
  });
}

function showWindowAtTray() {
  if (!mainWindow || !tray) return;

  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();

  // Position window centered horizontally below/above the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  mainWindow.setPosition(x, y, false);
  mainWindow.show();
  mainWindow.focus();
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

// IPC handlers for renderer communication
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});