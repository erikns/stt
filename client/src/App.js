import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/HomePage';
import Login from './components/LoginPage';
import Header from './components/Header';
import tasks from './actions';
import './App.css';

class App extends Component {
  render() {
      const renderApp = () => {
          if (this.props.session.loggedIn === true) {
              return (
                  <BrowserRouter>
                      <Route exact path='/' component={Home} />
                  </BrowserRouter>
              );
          } else {
              return (
                  <Login/>
              );
          }
      };

      return (
          <div className="App">
              <Header />
              {renderApp()}
          </div>
      );
  }
}

function mapStateToProps(state) {
    return {
        session: state.session
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(tasks.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
