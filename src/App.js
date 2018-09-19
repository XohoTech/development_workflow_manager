import React, { Component } from 'react';
import './App.css';
import Container from './Containers/Container';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Development Work-Flow Manager</h1>
                </header>
                <Container />
            </div>
        );
    }
}

export default App;
