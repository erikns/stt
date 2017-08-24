const db = require('sqlite');

module.exports = {
    getUser: (username) => {
        return db.get('SELECT * FROM user WHERE email = $email',
            {$email: username});
    }
};
