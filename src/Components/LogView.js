import React from 'react';
import {Card, Button} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import uuid from "uuid/v4";
import {withStyles} from "@material-ui/core/styles/index";
let ipcRenderer = require('electron').ipcRenderer;
import PropTypes from 'prop-types';

class LogView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logs: [],
            fullLogLines: [],
            fullLogTitle: null
        };

        this.closeModal = this.closeModal.bind(this);

        ipcRenderer.on('logs-grabbed', (event, logs) => {
            this.setState({logs})
        });

        ipcRenderer.on('full-log-grabbed', (event, fullLog) => {
            this.setState({fullLogTitle: fullLog.title, fullLogLines: fullLog.lines})
        });

    }

    wipeLog(path){
        ipcRenderer.send('wipe-log', path);
    }

    viewFullLog(path){
        ipcRenderer.send('grab-full-log', path);
    }

    closeModal() {
        this.setState({
            fullLogTitle: null,
            fullLogLines: []
        });
    }

    mapLogs() {
        let { classes } = this.props;

        return this.state.logs.map(log => {
            if(log.lines.length > 1 || (log.lines.length === 1 && log.lines[0] !== "")){
                let wipeLog = () => this.wipeLog(log.title);
                let viewFullLog = () => this.viewFullLog(log.title);
                return (
                    <Card key={uuid()} className={classes.wrapper}>
                        <h3>{log.title}</h3>
                        {log.lines.map(line =>{
                            return(<div key={uuid()} style={styles.line}>{line}</div>);
                        })}
                        <Button onClick={wipeLog} className={classes.button}>
                            Wipe Log
                        </Button>
                        <Button onClick={viewFullLog} className={classes.button}>
                            View Log
                        </Button>
                    </Card>
                );
            }
        })
    }

    render() {
        let logs = this.mapLogs();
        let { classes } = this.props;

        return (
            <div style={styles.cards}>
                <div key={uuid()}>{logs}</div>
                <Modal open={!!this.state.fullLogTitle}>
                    <div style={styles.modal}>
                        <Card key={uuid()} className={classes.fullLogCard}>
                            <h3>{this.state.fullLogTitle}</h3>
                            <div style={styles.fullLogs}>
                                {this.state.fullLogLines.map(line =>{
                                    return(<div key={uuid()} style={styles.line}>{line}</div>);
                                })}
                            </div>
                            <Button onClick={this.closeModal} className={classes.button}>
                                Close Log
                            </Button>
                        </Card>
                    </div>
                </Modal>
            </div>
        );
    }
}

const styles = {
    button: {
        margin: '1em'
    },
    line: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: "break-all"
    },
    cards: {
        width: "100%",
        backgroundColor: "#313335"
    },
    modal: {
        height: "100%",
        overflowY: "scroll",
        outline: 'none'
    },
    fullLogs: {
        height: "80%",
        overflowY: "scroll"
    }
};

const classes = theme => ({
    wrapper: {
        padding: '1em',
        margin: '1em',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.text
    },
    fullLogCard: {
        overflowY: "scroll",
        height: "80%",
        padding: '1em',
        margin: '1em',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.text
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.button,
        marginBottom: ".5em",
        marginTop: "1em"
    }
});

LogView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(LogView);







