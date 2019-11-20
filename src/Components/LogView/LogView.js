import React, {useEffect, useState} from 'react';
import {Card, Button} from "@material-ui/core";
import Modal from '@material-ui/core/Modal/index';
import uuid from "uuid/v4";
import {withStyles} from "@material-ui/core/styles/index";
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import {InputField} from "../InputField/InputField";
import {classes, styles} from "./LogViewStyles";

const LogView = (props) => {
    let [logs, setLogs] = useState([]);
    let [fullLogLines, setFullLogLines] = useState([]);
    let [fullFilteredLogLines, setFullFilteredLogLines] = useState([]);
    let [fullLogTitle, setFullLogTitle] = useState(null);
    let [filterTerm, setFilterTerm] = useState("");

    useEffect(() => {
        ipcRenderer.on('logs-grabbed', (event, newLogs) => {
            setLogs(newLogs);
        });

        ipcRenderer.on('full-log-grabbed', (event, fullLog) => {
            setFullLogTitle(fullLog.title);
            setFullLogLines(fullLog.lines);
            setFullFilteredLogLines(fullLog.lines);
        });
    }, []);

    useEffect(() => {
        let newLines = fullLogLines.filter((line) => {
            return line.includes(filterTerm);
        });
        setFullFilteredLogLines(newLines);

    },[filterTerm]);

    const sendWipeLog = (path) => {
        ipcRenderer.send('wipe-log', path);
    };

    const grabFullLog = (path) => {
        ipcRenderer.send('grab-full-log', path);
    };

    const closeModal = () => {
        setFullLogTitle(null);
        setFullLogLines(null);
    };

    const filterLines = (event) => {
        setFilterTerm(event.target.value)
    };

    const mapLogs = () => {
        let { classes } = props;

        return logs.map(log => {
            if(log.lines.length > 1 || (log.lines.length === 1 && log.lines[0] !== "")){
                let wipeLog = () => sendWipeLog(log.title);
                let viewFullLog = () => grabFullLog(log.title);
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
    };
    let mappedLogs = mapLogs();
    let { classes } = props;

    return (
        <div style={styles.cards}>
            <div key={uuid()}>{mappedLogs}</div>
            <Modal open={!!fullLogTitle}>
                <div style={styles.modal}>
                    <Card key={uuid()} className={classes.fullLogCard}>
                        <h3>{fullLogTitle}</h3>
                        <InputField onChange={filterLines} value={filterTerm} className={classes.inputStyle}/>
                        <div style={styles.fullLogs}>
                            {fullFilteredLogLines.map(line =>{
                                return(<div key={uuid()} style={styles.line}>{line}</div>);
                            })}
                        </div>
                        <Button onClick={closeModal} className={classes.button}>
                            Close Log
                        </Button>
                    </Card>
                </div>
            </Modal>
        </div>
    );

};


LogView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(LogView);







