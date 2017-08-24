const auth = require('./auth');

const loginRouter = require('express').Router();

loginRouter.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // TODO: use database eventually!
    if (username == 'goodUser') {
        res.status(200).json({token: auth.token(username)});
    } else {
        res.status(401).send({error: 'Invalid username or password'});
    }
});

module.exports = loginRouter;
