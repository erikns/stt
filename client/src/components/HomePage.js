import React from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';

import TaskList from './TaskList';

const Home = (props) => {
    const tasks = props.tasks;
    return (
        <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to TaskManager</h2>
            </div>
            <div className="App-intro">
                <TaskList tasks={tasks}/>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    console.log(state);
    return {
        tasks: state.tasks
    };
}

export default connect(mapStateToProps)(Home);
