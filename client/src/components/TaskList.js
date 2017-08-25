import React from 'react';

const TaskList = (props) => {
    const taskItems = props.tasks.map((task) => {
        return <li key={task.id}>{task.name}</li>
    });
    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {taskItems}
            </ul>
        </div>
    );
};

export default TaskList;
