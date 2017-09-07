import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../actions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: ''
        };
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    componentWillUnmount() {
        this.props.clearRegistering();
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    onPasswordConfirmChange(e) {
        this.setState({
            passwordConfirm: e.target.value
        });
    }

    onRegisterClick(e) {
        this.props.performRegister(this.state.username, this.state.password);
    }

    render() {
        const content = () => {
            if (this.props.registering === 'done') {
                return <Redirect to="/login" />;
            } else {
                return (
                    <div>
                        <p>Register for the service, or go <Link to="/">back</Link></p>
                        <form className="login">
                            <input type="text" placeholder="Username"
                                onChange={(e) => this.onUsernameChange(e)} />
                            <input type="password" placeholder="Password"
                                onChange={(e) => this.onPasswordChange(e)} />
                            <input type="password" placeholder="Confirm password"
                                onChange={(e) => this.onPasswordConfirmChange(e)} />
                            <input type="button" value="Register" onClick={e => {
                                e.preventDefault();
                                this.onRegisterClick(e);
                            }}/>
                        </form>
                    </div>
                );
            }
        };
        return content();
    }
};

function mapStateToProps(state) {
    return {
        registering: state.registering
    };
}

function mapDispatchToProps(dispatch) {
    return {
        performRegister: (username, password) => dispatch(actions.performRegister(username, password)),
        clearRegistering: () => dispatch(actions.clearRegistering())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
