const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('sqlite');

const tasks = require('./data/tasks');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    tasks.getAllTasks().then((data) => {
        console.log(data);
        res.status(200).json(data);
    });
});

app.post('/tasks', (req, res) => {
    tasks.addTask(req.body).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

app.put('/tasks/:id', (req, res) => {
    tasks.updateTask(Number(req.params.id), req.body).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(404).json({error: 'Task does not exist'});
    });
});

// LOGIN
// LOGOUT
// REGISTER
// ADD EDIT DELETE TASKS

Promise.resolve()
    .then(() => db.open(':memory:', {Promise}))
    .then(() => db.migrate({force: 'last'})
    .catch(err => console.error(err.stack))
    .then(() => app.listen(3001, () => {
        console.log('Server side app listening on port 3001');
})));
