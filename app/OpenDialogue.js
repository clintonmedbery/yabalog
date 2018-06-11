const electron = require('electron');
const dialog = electron.dialog;
const Prefs = require('./Prefs');

module.exports = (mainWindow, ipcMain) => {
    ipcMain.on('pick-folder', (event, arg) => {
        dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        }, (selection) => {
            const store = new Prefs({
                configName: 'user-preferences'
            });
            store.set('pathToFolder', selection[0]);
            event.sender.send('folder-picked', selection[0]);
        });

    });
};
