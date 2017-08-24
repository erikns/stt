const tasks = require('./data/tasks');
const router = require('express').Router();

router.get('/', (req, res) => {
    tasks.getAllTasks().then((data) => {
        res.status(200).json(data);
    });
});

router.post('/', (req, res) => {
    tasks.addTask(req.body).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
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

module.exports = router;
