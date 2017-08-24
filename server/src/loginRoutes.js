const auth = require('./auth');
const users = require('./data/users');

const loginRouter = require('express').Router();

function reportUnauthorized(res) {
    res.status(401).json({error: 'Invalid username or password'})
}

loginRouter.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.getUser(username)
        .then((user) => {
            if (password == user.password) {
                res.status(200).json({token: auth.token(user.username)});
            } else {
                console.log('Invalid password for user: ' + username);
                reportUnauthorized(res);
            }
        })
        .catch((err) => {
            console.log('Cannot load user ' + username + ' from database');
            console.log(err)
            reportUnauthorized(res);
        });
});

module.exports = loginRouter;
