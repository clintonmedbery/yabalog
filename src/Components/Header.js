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

    getNameSpaces() {
        ipcRenderer.send('grab-namespaces');
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
                            id="outlined-name"
                            margin="normal"
                            placeholder="Folder Path"
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: classes.inputStyle
                                }
                            }}
                            value={this.state.pathToFolder}
                        />
                        <div style={styles.buttonWrapper}>
                            <div style={styles.button}>
                                <Button variant="contained" className={classes.button} onClick={this.handleBrowse}>
                                    Browse
                                </Button>
                            </div>
                            <div style={styles.button}>
                                <Button variant="contained" className={classes.button} onClick={this.handleLogStart} disabled={!this.state.pathToFolder || this.state.pathToFolder === ""}>
                                    Grab Logs
                                </Button>
                            </div>
                            <div style={styles.button}>
                                <Button variant="contained" className={classes.button} onClick={this.handleWipeAllLogs} disabled={!this.state.pathToFolder || this.state.pathToFolder === ""}>
                                    Wipe Logs
                                </Button>
                            </div>
                            <div style={styles.button}>
                                <Button variant="contained" className={classes.button} onClick={this.getNameSpaces}>
                                    Kube
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
        flexDirection: 'row',
        width: '100%',
        paddingBottom: '1em'
    },
    buttonWrapper: {
        float: 'right',
        flex: 1,
        paddingRight: "2em",
        paddingTop: ".6em",
        paddingBottom: "1em",
        display: 'inline-flex'
    },
    button: {
        paddingLeft: '1em'
    }
};

const classes = theme => ({
    toolbar: {
        backgroundColor: '#3C3F41',
        width: '100%',
        height: '20%'
    },
    underlineStyle: {
        borderColor: 'white',
        width: '30em'

    },
    hintStyle: {
        color: 'white'
    },
    inputStyle: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.inputText,
        width: '30em'
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.button,
        marginBottom: ".5em",
        marginTop: "1em"
    }
});

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(Header);

