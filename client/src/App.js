import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './components/HomePage';
import './App.css';

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
