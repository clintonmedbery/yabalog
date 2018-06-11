import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
let ipcRenderer = require('electron').ipcRenderer;

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pathToFolder: null,
            logs: []
        };
        ipcRenderer.send('get-prefs');

        ipcRenderer.on('folder-picked', (event, arg) => {
            this.setState({pathToFolder: arg})
        });
    }

    handleBrowse() {
        ipcRenderer.send('pick-folder', 'open-picker');
    }

    handleLogStart() {
        ipcRenderer.send('grab-logs');
    }

    render() {
        return (
            <Toolbar style={styles.toolbar}>
                <ToolbarGroup>
                    <TextField
                        inputStyle={styles.inputStyle}
                        hintText="Folder Path"
                        underlineStyle={styles.underlineStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        hintStyle={styles.hintStyle}
                        value={this.state.pathToFolder}
                    />
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    <RaisedButton onClick={this.handleBrowse}>
                        Browse
                    </RaisedButton>
                    <RaisedButton onClick={this.handleLogStart} disabled={!this.state.pathToFolder}>
                        Log Time
                    </RaisedButton>
                </ToolbarGroup>
            </Toolbar>

        );
    }
}

const styles = {
    toolbar: {
        backgroundColor: '#4285f4',
        width: '100%'
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