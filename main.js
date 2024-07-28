const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Disable hardware acceleration
app.disableHardwareAcceleration();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'assets/icons/app-icon.png'), // Path to your icon file
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Update to use preload script
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

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

// Handle log messages from the renderer process
ipcMain.on('log', (event, message) => {
  console.log(message);
});
