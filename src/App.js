import React, { Component } from 'react';
import './App.css';
import DwmContainer from './Containers/DwmContainer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title text-center">Development Work-Flow Manager</h1>
                </header>
                <DwmContainer />
            </div>
        );
    }
}

export default App;
