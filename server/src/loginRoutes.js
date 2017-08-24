const auth = require('./auth');
const users = require('./data/users');

const crypto = require('./crypto');
const loginRouter = require('express').Router();

function reportUnauthorized(res) {
    res.status(401).json({error: 'Invalid username or password'})
}

loginRouter.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.getUser(username)
        .then((user) => {
            if (user && crypto.verifyPassword(password, user.password)) {
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

loginRouter.get('/refresh', (req, res) => {
    const token = req.headers.authorization;
    if (token && auth.verify(token)) {
        const decodedToken = auth.decodeToken(token);
        res.status(200).json({token: auth.token(decodedToken.subject)});
    } else {
        reportUnauthorized(res);
    }
})

module.exports = loginRouter;
