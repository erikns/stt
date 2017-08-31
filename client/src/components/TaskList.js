import React from 'react';

const TaskList = (props) => {
    const doneButton = (done) => {
        if (done) {
            return <div className="right">mark undone</div>;
        } else {
            return <div className="right">mark done</div>;
        }
    };

    const taskItems = props.tasks.map((task) => {
        if (task.done === 0) {
            return <li key={task.id}>{task.name}{doneButton(false)}</li>
        } else {
            return <li key={task.id} className="done">{task.name}{doneButton(true)}</li>
        }
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
