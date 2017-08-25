import React from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';

import TaskList from './TaskList';

const Home = (props) => {
    const tasks = props.tasks;
    const tasksFailure = props.tasksFailure;

    const mainContent = () => {
        if (tasksFailure === true) {
            return (
                <p>An error occurred!</p>
            );
        } else if (tasks.length > 0) {
            return (
                <TaskList tasks={tasks}/>
            );
        } else {
            return (
                <p>There are no tasks to display!</p>    
            );
        }
    }

    return (
        <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to TaskManager</h2>
            </div>
            <div className="App-intro">
                {mainContent()}
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    console.log(state);
    return {
        tasks: state.tasks,
        tasksFailure: state.tasksFailure
    };
}

export default connect(mapStateToProps)(Home);
