import Modal from "@material-ui/core/Modal";
import {Button, Card, withStyles} from "@material-ui/core";
import React from "react";
import uuid from "uuid/v4";

const KubeNameSpacesModalView = ({styles, nameSpaces, closeModal, classes}) => {

    return (
        <div style={styles.cards}>
            <div key={uuid()}>{nameSpaces}</div>
            <Modal open={nameSpaces.length > 0}>
                <div style={styles.modal}>
                    <Card key={uuid()} className={classes.nameSpaceCard}>
                        <h3>NameSpaces</h3>
                        <div style={styles.fullNameSpaces}>
                            {nameSpaces.map(line =>{
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
    )
};

export default KubeNameSpacesModalView;
