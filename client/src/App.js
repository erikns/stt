import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './components/HomePage';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Header from './components/Header';
import tasks from './actions';
import './App.css';

class App extends Component {
  render() {
      return (
          <div className="App">
              <Header logout={this.props.logout} session={this.props.session} />
              <Router>
                <div>
                    <Route exact path='/' render={() => (
                        this.props.session.loggedIn === true ? (
                            <Home />
                        ) : (
                            <Redirect to="/login" />
                        )
                    )} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </div>
              </Router>
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
        logout: () => dispatch(tasks.performLogout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
