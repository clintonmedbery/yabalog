'use strict'

// Import parts of electron to use
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const {ipcMain, electron} = require('electron')
const Prefs = require('./app/Prefs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
    dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true')
    app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false
    });
    mainWindow.webContents.openDevTools();

    // and load the index.html of the app.
    let indexPath;

    // Implementing Webpack

    indexPath = url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, 'dist', 'index.html'),
        slashes: true
    });


    mainWindow.loadURL(indexPath);

    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        // Open the DevTools automatically if developing
        if (dev) {
            mainWindow.webContents.openDevTools()
        }
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

app.commandLine.appendSwitch('remote-debugging-port', '9222');

ipcMain.on('get-prefs', (event, arg) => {
    const store = new Prefs({
        configName: 'user-preferences'
    });
    let path = store.get('pathToFolder');
    if(path){
        event.sender.send('folder-picked', path);
    }
});

require('./app/OpenDialogue')(mainWindow, ipcMain);
require('./app/GrabLogs')(mainWindow, ipcMain);