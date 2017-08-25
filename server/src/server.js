const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('sqlite');
const passport = require('passport');

const tasksRouter = require('./taskRoutes');
const loginRouter = require('./loginRoutes');
const registerRouter = require('./registerRoutes');

const auth = require('./auth');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use(auth.configure());

const authenticator = passport.authenticate('jwt', {session: false});

app.use('/tasks', authenticator, tasksRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// TODO: LOGOUT, REGISTER

Promise.resolve()
    .then(() => db.open(':memory:', {Promise}))
    .then(() => db.migrate({force: 'last'})
    .catch(err => console.error(err.stack))
    .then(() => app.listen(3001, () => {
        console.log('Server side app listening on port 3001');
})));
