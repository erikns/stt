const loginRouter = require('express').Router();

loginRouter.post('/', (req, res) => {
    res.status(401).send({error: 'Unauthorized'});
});

module.exports = loginRouter;
