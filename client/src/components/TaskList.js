import React from 'react';

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        if (task.done === 0) {
            return <li key={task.id}>{task.name}</li>
        } else {
            return <li key={task.id} className="done">{task.name}</li>
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
