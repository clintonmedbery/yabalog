import React, {useEffect, useRef, useState} from 'react';
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
    },
    inputStyle: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.inputText,
        width: '30em'
    }
});

const KubeNameSpacesModal = (props) => {
    let { classes } = props;
    let [nameSpaces, setNameSpaces] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [chosenPod, setChosenPod] = useState(null);
    let [filterTerm, setFilterTerm] = useState("");
    let [filteredNameSpaces, setFilteredNameSpaces] = useState([])

    useEffect(() => {
        ipcRenderer.on('namespaces-loading-true', (event, data) => {
            setIsLoading(true)
        });

        ipcRenderer.on('namespaces-grabbed', (event, data) => {
            setNameSpaces(data.nameSpaces);
            setFilteredNameSpaces(data.nameSpaces);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        let newPods = nameSpaces.filter((pod) => {
            return pod.name.includes(filterTerm) || pod.nameSpace.includes(filterTerm);
        });
        setFilteredNameSpaces(newPods);

    },[filterTerm]);

    let closeModal = () => {
        setNameSpaces([]);
    };

    let grabKubeLogs = () => {
        ipcRenderer.send('grab-logs-for-namespace', chosenPod);
    };

    let choosePod= (pod) => {
        setChosenPod(pod)
    };

    let filterPods = (event) => {
        setFilterTerm(event.target.value)
    };

    let showModal = nameSpaces.length > 0 || isLoading;
    return (
        <KubeNameSpacesModalView
            isLoading={isLoading}
            nameSpaces={filteredNameSpaces}
            styles={styles}
            classes={classes}
            chosenPod={chosenPod}
            filterTerm={filterTerm}
            showModal={showModal}
            filterPods={filterPods}
            grabKubeLogs={grabKubeLogs}
            choosePod={choosePod}
            closeModal={closeModal}
        />
    )
};



export default withStyles(classes)(KubeNameSpacesModal);

