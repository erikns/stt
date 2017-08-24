const db = require('sqlite');

const bool_to_int = (bool) => {
    if (bool) return 1;
    else return 0;
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
            const done_int = bool_to_int(task.done);
            db.run('UPDATE task SET name = $name, done = $done WHERE id = $id',
                { $name: task.text, $done: done_int, $id: id})
                .then((result) => {
                    fulfill(task);
                }).catch(err => {
                    reject(err);
                });
        });
    }
};
