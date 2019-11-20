import React, { Component } from 'react';
import Header from './Header';
import LogView from './LogView/LogView';
import KubeNameSpacesModal from "./KubeNameSpacesModal/KubeNameSpacesModal";

export default class Home extends Component {
    render() {
        const mainContainerStyle = {
            height: window.innerHeight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#313335"
        };
        return (
            <div style={mainContainerStyle}>
                <Header />
                <KubeNameSpacesModal/>
                <LogView/>
            </div>
        );
    }
}