import React from 'react';
import Icon from 'react-fa';

const TaskItem = ({done, id, name, markTaskDone}) => {
    const style = {
        cursor: 'pointer'
    }
    const iconName = done ? 'times' : 'check';
    return (
        <li className={done ? "done" : ""}>
            <Icon style={style} name="pencil" />
            &nbsp;&nbsp;
            {name}
            <div className="right toolbar">
                <Icon style={style} name={iconName} onClick={() => markTaskDone(id, !done)} />
                &nbsp;&nbsp;
                |
                &nbsp;&nbsp;
                <Icon style={style} name="trash" />
            </div>
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
            <h1><Icon name="tasks" /> Tasks</h1>
            <ul className="tasks">
                {taskItems}
            </ul>
        </div>
    );
};

export default TaskList;
