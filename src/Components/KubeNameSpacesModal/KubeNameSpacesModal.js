import React, {useEffect, useState} from 'react';
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
    chosenLine: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: "break-all",
        backgroundColor: "#6091EE"
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
        width: "70%",
        padding: '1em',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1em',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.text
    },
    nameSpaceCardLoading: {
        height: "10%",
        width: "70%",
        padding: '1em',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1em',
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
    let [isLoading, setIsLoading] = useState(false);
    let [chosenPod, setChosenPod] = useState(null);


    useEffect(() => {
        ipcRenderer.on('namespaces-loading-true', (event, data) => {
            setIsLoading(true)
        });

        ipcRenderer.on('namespaces-grabbed', (event, data) => {
            setNameSpaces(data.nameSpaces);
            setIsLoading(false);
        });
    }, []);

    let closeModal = () => {
        setNameSpaces([]);
    };

    let grabKubeLogs = () => {
        ipcRenderer.send('grab-logs-for-namespace', chosenPod);
    };

    let choosePod= (pod) => {
        console.log(pod);
        setChosenPod(pod)
    };

    return (
        <KubeNameSpacesModalView
            isLoading={isLoading}
            nameSpaces={nameSpaces}
            styles={styles}
            classes={classes}
            chosenPod={chosenPod}
            grabKubeLogs={grabKubeLogs}
            choosePod={choosePod}
            closeModal={closeModal}
        />
    )
};



export default withStyles(classes)(KubeNameSpacesModal);

