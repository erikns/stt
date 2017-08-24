const mockTasks = [
    {
        id: 1,
        text: 'Test task 1',
        done: false
    },
    {
        id: 2,
        text: 'Test task 2',
        done: false
    }
]

var mockNextId = 1;
const getNextId = () => {
    const next = mockNextId;
    mockNextId = mockNextId + 1;
    return next;
}

const getTask = (id) => {
    return mockTasks.find((task) => {
        return task.id === id;
    })
}

module.exports = {
    getAllTasks: () => {
        return new Promise((fulfill, reject) => {
            fulfill(mockTasks);
        });
    },

    addTask: (task) => {
        return new Promise((fulfill, reject) => {
            const id = getNextId();
            mockTasks.push({
                id: id,
                text: task.text,
                done: false
            });
            const created = getTask(id);
            if (created) {
                fulfill(created);
            } else {
                reject({error: 'Could not create task'});
            }
        });
    },

    updateTask: (id, task) => {
        return new Promise((fulfill, reject) => {
            var currentTask = getTask(id);
            if (task) {
                currentTask.text = task.text;
                currentTask.done = task.done;
                fulfill(currentTask);
            } else {
                reject({error: 'Task not found'})
            }
        });
    }
};
