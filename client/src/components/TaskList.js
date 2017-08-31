import React from 'react';
import Icon from 'react-fa';

const TaskToolbar = ({id, done, onToggle}) => {
    return (
        <div style={{cursor: 'pointer'}} className="right toolbar">
            <a onClick={() => onToggle(id, !done)}><Icon name='check' /></a>
        </div>
    );
};

const TaskItem = (props) => {
    return (
        <li className={props.done ? "done" : ""}>
            {props.name}
            <TaskToolbar id={props.id} done={props.done}
                onToggle={(id, done) => props.markTaskDone(id, done)}
            />
        </li>
    );
};

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        return (
            <TaskItem key={task.id} id={task.id} name={task.name} done={task.done}
                markTaskDone={props.markTaskDone} />
        );
    });

    return (
        <div>
            <h1>Tasks</h1>
            <ul className="tasks">
                {taskItems}
            </ul>
        </div>
    );
};

export default TaskList;
