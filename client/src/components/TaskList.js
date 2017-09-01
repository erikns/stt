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

const TaskItem = ({done, id, name, markTaskDone, deleteTask}) => {
    const style = {
        cursor: 'pointer'
    };
    const deleteStyle = Object.assign({}, style, {color: 'red'});
    const iconName = done ? 'times' : 'check';
    return (
        <li className={done ? "done" : ""} style={nonSelectableStyle}>
            <Icon style={style} name="pencil" />
            &nbsp;&nbsp;
            <span style={selectableStyle}>{name}</span>
            <div className="right toolbar">
                <Icon style={style} name={iconName} onClick={() => markTaskDone(id, !done)} />
                &nbsp;&nbsp;
                <span style={{color: "#ccc"}}>|</span>
                &nbsp;&nbsp;
                <Icon style={deleteStyle} name="trash" onClick={() => deleteTask(id)} />
            </div>
        </li>
    );
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
        this.props.addTask(this.state.taskInput);
    }

    render() {
        const inputStyle = {
            display: 'inline',
            margin: 0,
            width: '50%'
        }

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

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        if (props.hideCompleted && task.done) {
            return (<div key={task.id} style={{display: 'none'}}/>);
        } else {
            return (
                <TaskItem key={task.id} id={task.id} name={task.name} done={task.done}
                    markTaskDone={props.markTaskDone} deleteTask={props.deleteTask} />
            );
        }
    });

    const outer = () => {
        if (props.tasks.length < 1) {
            return (
                <ul className="tasks">
                    <li className="dim">There are no tasks to display!</li>
                    <NewTaskLine />
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
