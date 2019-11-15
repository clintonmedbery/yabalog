const exec = require('child_process').exec;

module.exports = (mainWindow, ipcMain) => {
    ipcMain.on('grab-namespaces', (event, arg) => {
        grabNamespaces(event, arg);
    });
};

const grabNamespaces = (event) => {
    console.log("Grabbing Namespaces Kube");

    execute('kubectl get pods --all-namespaces --template \'{{range .items}}{{.metadata.namespace}} {{.metadata.name}}{{"\\n"}}{{end}}\'', (output) => {
        let outputArray = output.split("\n");
        event.sender.send('namespaces-grabbed', { nameSpaces: outputArray });
    });
};


function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};
