const Prefs = require('./Prefs');
const LogGrabber = require('./LogGrabber');
const readLastLines = require('read-last-lines');
const fs = require('fs');

module.exports = (mainWindow, ipcMain) => {
    ipcMain.on('grab-logs', (event, arg) => {
        grabLogs(event, arg);
    });

    ipcMain.on('wipe-log', (event, file) => {
        fs.truncate(file, 0, function(){
            grabLogs(event);
        })
    });

    ipcMain.on('wipe-all-logs', (event) => {
        wipeLogs(event);
    });

    ipcMain.on('grab-full-log', (event, file) => {
        grabFullLog(event, file);
    });

};

function grabLogs(event, arg){
    const store = new Prefs({
        configName: 'user-preferences'
    });
    let path = store.get('pathToFolder');
    let logGrabber = new LogGrabber(path);
    let logs = logGrabber.grabLogs();

    var promises = [];
    console.log("Getting Logs", logs);
    logs.map(log => {
        let newLog = {};
        promises.push(readLastLines.read(log, 35)
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
}

wipeLogs = (event) => {
    console.log("Wiping logs");
    const store = new Prefs({
        configName: 'user-preferences'
    });
    let path = store.get('pathToFolder');
    let logGrabber = new LogGrabber(path);
    let logs = logGrabber.grabLogs();
    logs.map((log)=> {
        fs.truncate(log, 0);
    });
    grabLogs(event);
};

grabFullLog = (event, file) => {
    console.log("Get file", file);
    fs.readFile(file, 'utf8', function read(err, lines) {
        if (err) {
            console.error(err);
            throw err;
        }
        lines = lines.split("\n");
        event.sender.send('full-log-grabbed', {title: file, lines});
    });
};