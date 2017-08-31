import React from 'react';

const TaskItem = (props) => {
    const doneButton = (done) => {
        if (done) {
            return (
                <div className="right">
                    <button>mark undone</button>
                </div>
            );
        } else {
            return (
                <div className="right">
                    <button onClick={() => props.markTaskDone(props.id, true)}>mark done</button>
                </div>
            );
        }
    };

    if (props.done === 0) {
        return (
            <li>{props.name}{doneButton(props.done)}</li>
        );
    } else {
        return (
            <li className="done">{props.name}{doneButton(props.done)}</li>
        );
    }
};

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        return (<TaskItem key={task.id} id={task.id} name={task.name} done={task.done}
            markTaskDone={props.markTaskDone} />);
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
