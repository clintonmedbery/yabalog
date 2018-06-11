const Prefs = require('./Prefs');
const LogGrabber = require('./LogGrabber');
const readLastLines = require('read-last-lines');


module.exports = (mainWindow, ipcMain) => {
    ipcMain.on('grab-logs', (event, arg) => {

        const store = new Prefs({
            configName: 'user-preferences'
        });
        let path = store.get('pathToFolder');
        let logGrabber = new LogGrabber(path);
        let logs = logGrabber.grabLogs();

        var promises = [];
        logs.map(log => {
            let newLog = {};
            promises.push(readLastLines.read(log, 30)
                .then((lines) => {
                    lines = lines.split("\n");
                    newLog.lines = lines;
                    newLog.title = log;
                    return newLog;
                }));

        });
        Promise.all(promises).then(function(logs) {
            // returned data is in arguments[0], arguments[1], ... arguments[n]
            // you can process it here
            event.sender.send('logs-grabbed', logs);

        }, function(err) {
            // error occurred
            console.log(err);
        });


    });
};
