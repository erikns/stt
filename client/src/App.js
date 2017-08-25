import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadPersistedLogin } from './actions';

import Home from './components/HomePage';
import Login from './components/LoginPage';
import Header from './components/Header';
import './App.css';

class App extends Component {
  componentDidMount() {
      this.props.onLoad();
  }

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
        onLoad: () => {
            dispatch(loadPersistedLogin());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
