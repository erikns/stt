const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('sqlite');
const passport = require('passport');

const tasksRouter = require('./taskRoutes');
const loginRouter = require('./loginRoutes');

const auth = require('./auth');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use(auth());

app.use('/tasks', tasksRouter);
app.use('/login', loginRouter);

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
