

import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class Demo extends React.Component {
    a=3
    componentDidMount() {
        createIframe();
    }
    
    render() {
        return (
            <div>
                demo
            </div>
        );
    }
}

