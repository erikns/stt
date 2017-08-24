const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('sqlite');

const tasksRouter = require('./taskRoutes');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/tasks', tasksRouter);

// LOGIN
// LOGOUT
// REGISTER

Promise.resolve()
    .then(() => db.open(':memory:', {Promise}))
    .then(() => db.migrate({force: 'last'})
    .catch(err => console.error(err.stack))
    .then(() => app.listen(3001, () => {
        console.log('Server side app listening on port 3001');
})));
