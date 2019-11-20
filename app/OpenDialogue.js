const electron = require('electron');
const dialog = electron.dialog;
const Prefs = require('./Prefs');

module.exports = (mainWindow, ipcMain) => {
    ipcMain.on('pick-folder', (event, arg) => {
        dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        }).then(result => {
            if(result.canceled){
                return;
            }
            const store = new Prefs({
                configName: 'user-preferences'
            });
            console.log(result.filePaths[0]);
            store.set('pathToFolder', result.filePaths[0]);
            event.sender.send('folder-picked', result.filePaths[0]);
        }).catch(err => {
            console.log(err)
        })

    });
};
