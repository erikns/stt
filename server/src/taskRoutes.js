const tasks = require('./data/tasks');
const router = require('express').Router();

router.get('/', (req, res) => {
    tasks.getAllTasks().then((data) => {
        data = data.map((elem) => {
            if (elem.done === 1) {
                elem.done = true;
            } else {
                elem.done = false;
            }
            return elem;
        });
        res.status(200).json(data);
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    tasks.addTask(req.body).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
    tasks.updateTask(Number(req.params.id), req.body).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(404).json({error: 'Task does not exist'});
    });
});

router.patch('/:id', (req, res) => {
    const updated_task = req.body;
    console.log(updated_task);
    tasks.getTask(Number(req.params.id)).then((task) => {
        console.log(task);
        if (updated_task.name) { task.name = updated_task.name };
        if (updated_task.done === true) {
            task.done = true;
        } else if (updated_task.done === false) {
            task.done = false;
        } else {
            task.done = false; // default to false
        }
        console.log('Updated task');
        console.log(task);
        tasks.updateTask(Number(req.params.id), task).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(404).json({error: 'Task does not exist'});
        });
    });
})

router.delete('/:id', (req, res) => {
    tasks.deleteTask(Number(req.params.id)).then(() => {
        res.status(204).send();
    }).catch(err => {
        console.log(err);
        res.status(404).json({error: 'Task does not exist'});
    });
});

module.exports = router;
