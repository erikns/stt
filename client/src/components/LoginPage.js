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

    render() {
        return (
            <div className="App-intro">
                <p>Please log in to use the service</p>
                <form className="login">
                    <input type="text" name="username" placeholder="Username"
                        onChange={this.onUsernameChange} />
                    <input type="password" name="password" placeholder="Password"
                        onChange={this.onPasswordChange} />
                    <input type="button" value="Log in" onClick={e => {
                        e.preventDefault();
                        this.props.onLoginClick()
                    }}/>
                </form>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
