import Modal from "@material-ui/core/Modal";
import {Button, Card} from "@material-ui/core";
import React from "react";
import uuid from "uuid/v4";
import {get as _get} from 'lodash';
import {InputField} from "../InputField/InputField";

const KubeNameSpacesModalView = ({ styles, nameSpaces, closeModal, classes, isLoading, filterPods, grabKubeLogs, chosenPod, choosePod, filterTerm, showModal }) => {
    let title = isLoading ? "Loading..." : "Click a NameSpace to Grab Logs";
    let nameSpaceCardClass = isLoading ? classes.nameSpaceCardLoading : classes.nameSpaceCard;

    //Make this a table
    let formattedNameSpaces = nameSpaces.map(line =>{
        let lineStyle = (_get(chosenPod, 'name') === line.name) ? styles.chosenLine : styles.line;
        return(<div key={uuid()} style={lineStyle} onClick={() => choosePod(line)}>{`${line.nameSpace} ${line.name}`}</div>);
    });

    return (
        <div style={styles.cards}>
            <Modal open={showModal}>
                <div style={styles.modal}>
                    <Card key={uuid()} className={nameSpaceCardClass}>
                        <h3>{title}</h3>
                        {!isLoading &&
                            <InputField onChange={filterPods} value={filterTerm} className={classes.inputStyle}/>
                        }
                        <div style={styles.fullNameSpaces}>
                            {formattedNameSpaces}
                        </div>
                        <Button onClick={grabKubeLogs} className={classes.button} disabled={!chosenPod}>
                            Grab Kube Logs
                        </Button>
                        <Button onClick={closeModal} className={classes.button} disabled={isLoading}>
                            Close NameSpace Search
                        </Button>
                    </Card>
                </div>
            </Modal>
        </div>
    )
};

export default KubeNameSpacesModalView;

