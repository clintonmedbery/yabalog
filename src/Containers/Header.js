import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
let ipcRenderer = require('electron').ipcRenderer;

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pathToFolder: "",
            logs: []
        };
        ipcRenderer.send('get-prefs');

        ipcRenderer.on('folder-picked', (event, arg) => {
            this.setState({pathToFolder: arg})
        });

        this.autoGrabLogs.bind(this);
        var self = this;
        setTimeout(function() {
            self.autoGrabLogs();
        }, 30000);
    }

    handleBrowse() {
        ipcRenderer.send('pick-folder', 'open-picker');
    }

    handleLogStart() {
        ipcRenderer.send('grab-logs');
    }

    handleWipeAllLogs() {
        ipcRenderer.send('wipe-all-logs');
    }

    autoGrabLogs(){
        if(this.state.pathToFolder && this.state.pathToFolder !== ""){
            ipcRenderer.send('grab-logs');
        }
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <Toolbar style={styles.toolbar}>
                    <div>
                        <TextField
                            inputStyle={styles.inputStyle}
                            hintText="Folder Path"
                            underlineStyle={styles.underlineStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            hintStyle={styles.hintStyle}
                            value={this.state.pathToFolder}
                        />
                        <div style={styles.buttonWrapper}>
                            <div style={styles.button}>
                                <RaisedButton onClick={this.handleBrowse}>
                                    Browse
                                </RaisedButton>
                            </div>
                            <div style={styles.button}>
                                <RaisedButton onClick={this.handleLogStart} disabled={!this.state.pathToFolder || this.state.pathToFolder === ""}>
                                    Grab Logs
                                </RaisedButton>
                            </div>
                            <div style={styles.button}>
                                <RaisedButton onClick={this.handleWipeAllLogs} disabled={!this.state.pathToFolder || this.state.pathToFolder === ""}>
                                    Wipe Logs
                                </RaisedButton>
                            </div>
                        </div>
                    </div>

                </Toolbar>
            </div>

        );
    }
}

const styles = {
    buttonWrapper: {
        float: 'right',
        flex: 1,
        padding: '.5em',
        display: 'inline-flex'
    },
    button: {
        paddingLeft: '1em'
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: '4em'
    },
    toolbar: {
        backgroundColor: '#4285f4',
        width: '100%',
        display: 'inline',
        flex: 2
    },
    underlineStyle: {
        borderColor: 'white',
        width: '30em'

    },
    hintStyle: {
        color: 'white'
    },
    inputStyle: {
        color: 'white',
        width: '30em'
    }
};