import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskList from './TaskList';

import { getAllTasks } from '../actions';
function mapDispatchToProps(dispatch) {
    return {
        loadTasks: () => dispatch(getAllTasks())
    }
}

class Home extends Component {
    componentWillMount() {
        console.log('Will mount home page');
        this.props.loadTasks();
    }

    render() {
        const tasks = this.props.tasks;
        const tasksFailure = this.props.tasksFailure;

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
            <div className="App-intro">
                {mainContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        tasks: state.tasks,
        tasksFailure: state.tasksFailure,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
