import React, { Component } from 'react';
import Header from './Header';
import LogView from './LogView';

export default class Home extends Component {
    render() {
        const mainContainerStyle = {
            height: window.innerHeight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };
        return (
            <div style={mainContainerStyle}>
                <Header />
                <LogView/>
            </div>
        );
    }
}