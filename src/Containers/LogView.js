import React from 'react';
import {Card, RaisedButton} from "material-ui";
import uuid from "uuid/v4";
let ipcRenderer = require('electron').ipcRenderer;

export default class LogView extends React.Component {
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
            if(log.lines.length > 1 || (log.lines.length === 1 && log.lines[0] !== "")){
                return (
                    <Card key={uuid()} style={styles.wrapper}>
                        <h3>{log.title}</h3>
                        {log.lines.map(line =>{
                            return(<div key={uuid()} style={styles.line}>{line}</div>);
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
            <div key={uuid()}>{logs}</div>
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
    },
    line: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: "break-all"
    }
};







