import React from 'react';
import Icon from 'react-fa';

const TaskItem = ({done, id, name, markTaskDone}) => {
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
                <Icon style={deleteStyle} name="trash" />
            </div>
        </li>
    );
};

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        if (props.hideCompleted && task.done) {
            return (<div key={task.id} style={{display: 'none'}}/>);
        } else {
            return (
                <TaskItem key={task.id} id={task.id} name={task.name} done={task.done}
                    markTaskDone={props.markTaskDone} />
            );
        }
    });

    const toggleButtonText = props.hideCompleted ? "Show completed" : "Hide completed";

    return (
        <div>
            <h1><Icon name="tasks" /> Tasks</h1>
            <div>
                <button onClick={() => props.toggleHideCompletedTasks()}>{toggleButtonText}</button>
            </div>
            <ul className="tasks">
                {taskItems}
            </ul>
        </div>
    );
};

export default TaskList;
