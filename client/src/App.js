import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Home = () => {
    return (
        <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to TaskManager</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    );
};

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Route exact path='/' component={Home} />
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
