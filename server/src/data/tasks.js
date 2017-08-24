const db = require('sqlite');

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
        return db.all('SELECT * from task');
    },

    addTask: (task) => {
        return new Promise((fulfill, reject) => {
            db.run('INSERT INTO task (name, done) VALUES ($name, $done)', {
                $name: task.text,
                $done: 0
            }).then((res) => {
                const created_task = task;
                task.id = res.lastId
                fulfill(created_task);
            }).catch(err => {
                reject(err);
            });
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
