import React, { Component } from 'react';
import Icon from 'react-fa';

const nonSelectableStyle = {
   "-webkit-user-select": "none",
   "-moz-user-select": "-moz-none",
   "-khtml-user-select": "none"
};
const selectableStyle = {
    "-webkit-user-select": "auto",
    "-moz-user-select": "-moz-auto",
    "-khtml-user-select": "auto"
};
const inputStyle = {
    display: 'inline',
    margin: 0,
    width: '50%'
}

class TaskItem extends Component {
    constructor(props) {
        super(props)

        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            taskName: this.props.name,
            editing: false
        };
    }

    toggleEditing() {
        if (!this.done) {
            this.setState((oldState) => {
                return {
                    editing: !oldState.editing
                }
            });
        }
    }

    handleChange(e) {
        this.setState({taskName: e.target.value});
    }

    handleSave() {
        this.toggleEditing();
        this.props.updateTask(this.props.id, this.state.taskName);
    }

    render () {
        if (this.state.editing) {
            return (
                <li style={nonSelectableStyle}>
                    <Icon style={{cursor: 'pointer'}} name='save' onClick={() => this.handleSave()} />
                    &nbsp;&nbsp;
                    <input type="text" style={inputStyle} onChange={this.handleChange}
                        ref={(input) => this.taskInput = input}
                        value={this.state.taskName} />
                </li>
            );
        } else {
            const style = {
                cursor: 'pointer'
            };
            const deleteStyle = Object.assign({}, style, {color: 'red'});
            const iconName = this.done ? 'times' : 'check';
            return (
                <li className={this.props.done ? "done" : ""} style={nonSelectableStyle}>
                    <Icon style={style} name="pencil" onClick={() => this.toggleEditing()} />
                    &nbsp;&nbsp;
                    <span style={selectableStyle}>{this.props.name}</span>
                    <div className="right toolbar">
                        <Icon style={style}
                            name={iconName}
                            onClick={() => this.props.markTaskDone(this.props.id, !this.props.done)} />
                        &nbsp;&nbsp;
                        <span style={{color: "#ccc"}}>|</span>
                        &nbsp;&nbsp;
                        <Icon style={deleteStyle} name="trash" onClick={() => this.props.deleteTask(this.props.id)} />
                    </div>
                </li>
            );
        }
    }
};

class NewTaskLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            taskInput: ''
        };
        this.toggleEditing = this.toggleEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidUpdate() {
        if (this.state.editMode) {
            this.taskInput.focus();
        }
    }

    toggleEditing() {
        this.setState((prevState) => {
            return { editMode: !prevState.editMode };
        });
    }

    handleChange(event) {
        this.setState({ taskInput: event.target.value });
    }

    handleSave() {
        if (this.state.taskInput && this.state.taskInput.length > 0) {
            this.props.addTask(this.state.taskInput);
            this.setState({ taskInput: '', editMode: false });
        }
    }

    handleKeyPress(event) {
        if (event.charCode === 13) { // enter key pressed
            this.handleSave();
        }
    }

    render() {

        const content = () => {
            if (this.state.editMode) {
                return (
                    <li style={nonSelectableStyle}>
                        <Icon style={{cursor: 'pointer'}} name="plus"
                            onClick={() => this.toggleEditing()} />
                        &nbsp;&nbsp;
                        <input type="text" style={inputStyle}
                            ref={(input) => this.taskInput = input}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            value={this.state.taskInput} />
                        <div className="right toolbar">
                            <Icon style={{cursor: 'pointer'}} name="save"
                                onClick={() => this.handleSave()} />
                        </div>
                    </li>
                );
            } else {
                return (
                    <li className="dim" style={nonSelectableStyle}>
                        <Icon style={{cursor: 'pointer'}} name="plus"
                            onClick={() => this.toggleEditing()} />
                        &nbsp;&nbsp;Add a new task
                    </li>
                );
            }
        };

        return content();
    }
}

function shouldHide(hiddenIds, id) {
    return hiddenIds.indexOf(id) >= 0;
}

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        if (shouldHide(props.hiddenTasks, task.id)) {
            return (<div key={task.id} style={{display: 'none'}}/>);
        } else {
            return (
                <TaskItem key={task.id} id={task.id} name={task.name} done={task.done}
                    markTaskDone={props.markTaskDone} deleteTask={props.deleteTask}
                    updateTask={props.updateTask} />
            );
        }
    });

    const outer = () => {
        if (props.tasks.length < 1) {
            return (
                <ul className="tasks">
                    <li className="dim">Please create some tasks</li>
                    <NewTaskLine addTask={props.addTask} />
                </ul>
            );
        } else {
            return (
                <ul className="tasks">
                    {taskItems}
                    <NewTaskLine addTask={props.addTask} />
                </ul>
            );
        }
    };

    const toggleButtonText = props.hideCompleted ? "Show completed" : "Hide completed";

    return (
        <div>
            <h1><Icon name="tasks" /> Tasks</h1>
            <div>
                <button onClick={() => props.toggleHideCompletedTasks()}>
                    <Icon name="eye-slash"></Icon> {toggleButtonText}
                </button>
            </div>
            {outer()}
        </div>
    );
};

export default TaskList;
