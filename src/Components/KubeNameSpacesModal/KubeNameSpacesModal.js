import React, {useState} from 'react';
import KubeNameSpacesModalView from "./KubeNamespacesModalView";
import {withStyles} from "@material-ui/core";
let ipcRenderer = require('electron').ipcRenderer;

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
    fullNameSpaces: {
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
    nameSpaceCard: {
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

const KubeNameSpacesModal = (props) => {
    let { classes } = props;
    let [nameSpaces, setNameSpaces] = useState([]);

    ipcRenderer.on('namespaces-grabbed', (event, data) => {
        setNameSpaces(data.nameSpaces)
    });

    return (
        <KubeNameSpacesModalView nameSpaces={nameSpaces} styles={styles} classes={classes}/>
    )
};



export default withStyles(classes)(KubeNameSpacesModal);

