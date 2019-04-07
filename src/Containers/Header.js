import React from 'react';
import {Button, TextField, Toolbar} from "@material-ui/core";
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class Header extends React.Component {
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
        const { classes } = this.props;

        return (
            <div style={styles.wrapper}>
                <Toolbar className={classes.toolbar}>
                    <div>
                        <TextField
                            className={classes.inputStyle}
                            placeholder="Folder Path"
                            // underlineStyle={classes.underlineStyle}
                            // underlineFocusStyle={classes.underlineStyle}
                            // hintStyle={classes.hintStyle}
                            value={this.state.pathToFolder}
                        />
                        <div style={styles.buttonWrapper}>
                            <div style={styles.button}>
                                <Button onClick={this.handleBrowse}>
                                    Browse
                                </Button>
                            </div>
                            <div style={styles.button}>
                                <Button onClick={this.handleLogStart} disabled={!this.state.pathToFolder || this.state.pathToFolder === ""}>
                                    Grab Logs
                                </Button>
                            </div>
                            <div style={styles.button}>
                                <Button onClick={this.handleWipeAllLogs} disabled={!this.state.pathToFolder || this.state.pathToFolder === ""}>
                                    Wipe Logs
                                </Button>
                            </div>
                        </div>
                    </div>

                </Toolbar>
            </div>

        );
    }
}

const styles = {
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: '4em'
    },
    buttonWrapper: {
        float: 'right',
        flex: 1,
        padding: '.5em',
        display: 'inline-flex'
    },
    button: {
        paddingLeft: '1em'
    }

};

const classes = {
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
Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(Header);

