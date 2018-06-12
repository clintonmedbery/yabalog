import React from 'react';
import {Card, RaisedButton} from "material-ui";
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

    wipeLog(path){
        ipcRenderer.send('wipe-log', path);
    }

    mapLogs() {
        return this.state.logs.map(log => {
            if(log.lines.length > 1){
                return (
                    <Card style={styles.wrapper}>
                        <h3>{log.title}</h3>
                        {log.lines.map(line =>{
                            return(<div>{line}</div>);
                        })}
                        <RaisedButton onClick={() => this.wipeLog(log.title)} style={styles.button}>
                            Wipe Log
                        </RaisedButton>
                    </Card>
                );
            }
        })
    }

    render() {
        let logs = this.mapLogs();
        return (
            <div>{logs}</div>
        );
    }
}

const styles = {
    button: {
        margin: '1em'
    },
    wrapper: {
        padding: '1em',
        margin: '1em'
    }
};







