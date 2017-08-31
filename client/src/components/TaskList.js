import React from 'react';

const TaskItem = (props) => {
    const doneButton = (done) => {
        if (done) {
            return (
                <div className="right">
                    mark undone
                </div>
            );
        } else {
            return (
                <div className="right">
                    mark done
                </div>
            );
        }
    };

    if (props.done === 0) {
        return (
            <li key={props.id}>{props.name}{doneButton(props.done)}</li>
        );
    } else {
        return (
            <li key={props.id} className="done">{props.name}{doneButton(props.done)}</li>
        );
    }
};

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        return <TaskItem id={task.id} name={task.name} done={task.done} />
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
