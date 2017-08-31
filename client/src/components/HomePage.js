import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskList from './TaskList';

import { getAllTasks, markTaskDone, toggleHideCompletedTasks } from '../actions';
function mapDispatchToProps(dispatch) {
    return {
        loadTasks: () => dispatch(getAllTasks()),
        markTaskDone: (id, done) => dispatch(markTaskDone(id, done)),
        toggleHideCompletedTasks: () => dispatch(toggleHideCompletedTasks())
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
                    <TaskList tasks={tasks}
                        markTaskDone={this.props.markTaskDone}
                        toggleHideCompletedTasks={this.props.toggleHideCompletedTasks}
                        hideCompleted={this.props.hideCompleted}
                    />
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
        hideCompleted: state.hideCompleted
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
