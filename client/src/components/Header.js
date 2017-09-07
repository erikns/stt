import React from 'react';
import logo from '../logo.svg';

export default (props) => {
    const sessionSection = () => {
        if (props.session.loggedIn) {
            return (
                <button style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                    onClick={() => props.logout()}>Logout</button>
            );
        }
    }

    const style = () => {
        if (props.session.loggedIn) {
            return {
                position: 'relative',
                top: '-25px'
            };
        } else {
            return {};
        }
    }

    return (
        <div className="App-header">
          <div style={{ float: 'right', right: 10, top: 10 }}>
            {sessionSection()}
          </div>
          <div style={{ clear: 'both' }} />
          <img src={logo} className="App-logo" alt="logo" style={style()} />
          <h2 style={style()}>Welcome to TaskManager</h2>
        </div>
    );
}
