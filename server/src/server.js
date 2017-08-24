const express = require('express');
const morgan = require('morgan');

const tasks = require('./data/tasks');

const app = express();
app.use(morgan('dev'));

app.get('/tasks', (req, res) => {
    tasks.getAllTasks().then((data) => {
        res.status(200).json(data);
    });
});

// LOGIN
// LOGOUT
// REGISTER
// ADD EDIT DELETE LIST TASKS

app.listen(3001, () => {
    console.log('Server side app listening on port 3001');
})
