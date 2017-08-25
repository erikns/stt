const db = require('sqlite');

module.exports = {
    getUser: (username) => {
        return db.get('SELECT * FROM user WHERE email = $email',
            {$email: username});
    },

    addUser: (user) => {
        return new Promise((fulfill, reject) => {
            if (user && user.username && user.password) {
                db.run('INSERT INTO user (email, password) VALUES ($email, $password)',
                {$email: user.username, $password: user.password})
                .then((res) => {
                    console.log(res);
                    const created_user = {username: user.username};
                    created_user.id = res.lastID;
                    fulfill(created_user);
                }).catch((err) => {
                    console.log(err);
                    if (err.code == 'SQLITE_CONSTRAINT') {
                        reject({error: 'USER_EXISTS', details: err});
                    } else {
                        reject({error: 'OTHER_DB_ERROR', details: err});
                    }
                });
            } else {
                reject({error: 'MISSING_FIELDS'});
            }
        });
    }
};
