import React from 'react';
let ipcRenderer = require('electron').ipcRenderer;

export default class LogGrabber extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logs: []
        };
        this.mapLogs.bind(this);

        ipcRenderer.on('logs-grabbed', (event, arg) => {
            this.setState({logs: arg})
        });

    }

    mapLogs() {
        return this.state.logs.map(log => {
            return (
                <div>
                    <h2>{log.title}</h2>
                    {log.lines.map(line =>{
                        return(<div>{line}</div>);
                    })}
                </div>
            );
        })
    }

    render() {
        let logs = this.mapLogs();
        return (
            <div>{logs}</div>
        );
    }
}

// const styles = {
//
// };







