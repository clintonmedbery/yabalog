import Modal from "@material-ui/core/Modal";
import {Button, Card} from "@material-ui/core";
import React from "react";
import uuid from "uuid/v4";
import {get as _get} from 'lodash';

const KubeNameSpacesModalView = ({ styles, nameSpaces, closeModal, classes, isLoading, chosenNameSpace, grabKubeLogs, chosenPod, choosePod }) => {
    let title = isLoading ? "Loading..." : "Click a NameSpace to Grab Logs";
    let nameSpaceCardClass = isLoading ? classes.nameSpaceCardLoading : classes.nameSpaceCard;

    //Make this a table
    let formattedNameSpaces = nameSpaces.map(line =>{
        let lineStyle = (_get(chosenPod, 'name') === line.name) ? styles.chosenLine : styles.line;
        return(<div key={uuid()} style={lineStyle} onClick={() => choosePod(line)}>{`${line.nameSpace} ${line.name}`}</div>);
    });

    return (
        <div style={styles.cards}>
            <Modal open={formattedNameSpaces.length > 0 || isLoading}>
                <div style={styles.modal}>
                    <Card key={uuid()} className={nameSpaceCardClass}>
                        <h3>{title}</h3>
                        <div style={styles.fullNameSpaces}>
                            {formattedNameSpaces}
                        </div>
                        <Button onClick={grabKubeLogs} className={classes.button} disabled={!chosenPod}>
                            Grab Kube Logs
                        </Button>
                        <Button onClick={closeModal} className={classes.button} disabled={isLoading}>
                            Close Log
                        </Button>
                    </Card>
                </div>
            </Modal>
        </div>
    )
};

export default KubeNameSpacesModalView;
