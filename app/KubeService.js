const exec = require('child_process').exec;

module.exports = (mainWindow, ipcMain) => {
    ipcMain.on('grab-namespaces', (event, arg) => {
        grabNamespaces(event, arg);
    });

    ipcMain.on('grab-logs-for-namespace', (event, arg) => {
        grabLogsForNameSpace(event, arg);
    });
};

const grabNamespaces = (event) => {
    console.log("Grabbing Namespaces Kube");
    event.sender.send('namespaces-loading-true');

    execute('kubectl get pods --all-namespaces --template \'{{range .items}}{{.metadata.namespace}} {{.metadata.name}}{{"\\n"}}{{end}}\'', (output) => {
        let outputArray = output.split("\n");
        outputArray = outputArray.map((outputToFormat) => {
            let newOutput = outputToFormat.split(" ");
            return { nameSpace: newOutput[0], name: newOutput[1]};
        });
        event.sender.send('namespaces-grabbed', { nameSpaces: outputArray });
    });
};

//kubectl logs bot-name -n namespace -f
const grabLogsForNameSpace = (event, arg) => {
    console.log("Grabbing Logs for ", arg);
    let command = `kubectl --namespace ${arg.nameSpace} logs ${arg.name}`;
    console.log(command);
    execute(command, (output) => {
        let lines = output.split("\n");
        event.sender.send('full-log-grabbed', {title: `Logs for ${arg.nameSpace}  ${arg.name}`, lines});
        event.sender.send('namespaces-grabbed', { nameSpaces: [] });
    });
};

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};
