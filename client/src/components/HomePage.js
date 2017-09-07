import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskList from './TaskList';

import tasks from '../actions';
function mapDispatchToProps(dispatch) {
    return {
        loadTasks: () => dispatch(tasks.getAllTasks()),
        deleteTask: (id) => dispatch(tasks.deleteTask(id)),
        markTaskDone: (id, done) => dispatch(tasks.markTaskDone(id, done)),
        addTask: (txt) => dispatch(tasks.addTask(txt)),
        updateTask: (id, txt) => dispatch(tasks.updateTask(id, txt)),
        toggleHideCompletedTasks: () => dispatch(tasks.toggleHideCompletedTasks())
    }
}

class Home extends Component {
    componentWillMount() {
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
            } else {
                return (
                    <TaskList tasks={tasks}
                        hiddenTasks={this.props.hiddenTasks}
                        markTaskDone={this.props.markTaskDone}
                        toggleHideCompletedTasks={this.props.toggleHideCompletedTasks}
                        hideCompleted={this.props.hideCompleted}
                        deleteTask={this.props.deleteTask}
                        addTask={this.props.addTask}
                        updateTask={this.props.updateTask}
                    />
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
        hideCompleted: state.hideCompleted,
        hiddenTasks: state.hiddenTasks
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
