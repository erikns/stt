import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    console.log('Mapping state in login page');
    console.log(state);
    return {
        loginFailure: state.session.loginFailure
    };
}

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleLoginClick(event) {
        this.props.onLoginClick(this.state.username, this.state.password);
        this.props.history.push('/');
    }

    render() {
        const msg = () => {
            if (this.props.loginFailure) {
                return (
                    <p className="error">Login failed</p>
                );
            } else {
                return (
                    <p>Please log in to use the service</p>
                )
            }
        }
        return (
            <div className="App-intro">
                {msg()}
                <form className="login">
                    <input type="text" name="username" placeholder="Username"
                        onChange={this.onUsernameChange} />
                    <input type="password" name="password" placeholder="Password"
                        onChange={this.onPasswordChange} />
                    <input type="button" value="Log in" onClick={e => {
                        e.preventDefault();
                        this.handleLoginClick();
                    }}/>
                </form>
                <p>If you do not have an account, you can <Link 
                    to="/register">register</Link></p>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
