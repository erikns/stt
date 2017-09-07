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
      return (
          <div className="App">
              <Header logout={this.props.logout} session={this.props.session} />
              <BrowserRouter>
                <Route exact path='/' render={() => (
                    this.props.session.loggedIn ? (
                        <Home />
                    ) : (
                        <Login />
                    )
                )} />
              </BrowserRouter>
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
        logout: () => dispatch(tasks.performLogout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
