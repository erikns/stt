import React, { Component } from 'react';
import { connect } from 'react-redux';

import { performLogin } from '../actions';

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: (username, password) => {
            dispatch(performLogin(username, password));
        }
    }
}

const mapStateToProps = (state) => {
    return {};
}

const LoginPage = (props) => {
    return (
        <div className="App-intro">
        <p>Please log in to use the service</p>
        <button onClick={e => {
            e.preventDefault();
            props.onLoginClick('user1@localhost', 'password1')
        }}>
            TEST
        </button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
