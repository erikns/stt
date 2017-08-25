const users = require('./data/users');

const registerRouter = require('express').Router();

function validateInput(user) {
    var errors = [];
    if (user) {
        if (user.username && user.password) {
            if (user.username.length < 3) { // TODO: better name validation! needs to be email!
                errors.push('Username must be at least 3 characters');
            }
            if (user.password.length < 8) {
                errors.push('Password must be at least 8 characters');
            }
        } else {
            errors.push('Missing username or password');
        }
    } else {
        errors.push('Invalid registration request. Missing user.');
    }

    if (errors.length > 0) {
        return {valid: false, errors: errors};
    } else {
        return {valid: true, errors: null};
    }
}

registerRouter.post('/', (req, res) => {
    const candidate_user = req.body;
    const validation = validateInput(candidate_user);
    if (validation.valid === true) {
        users.addUser(candidate_user)
            .then((created_user) => {
                res.status(201).json(created_user);
            })
            .catch((err) => {
                if (err.error == 'USER_EXISTS') {
                    res.status(400).json({code: err.error, message: 'User already exists'});
                } else {
                    res.status(500).json({code: err.error, message: 'Server error'});
                }
            });
    } else {
        res.status(400).json({error: 'Validation errors', details: validation.errors});
    }
});

module.exports = registerRouter;
