const db = require('sqlite');

const mockUsers = [
    {
        username: 'user1@localhost',
        password: 'password1'
    },
    {
        username: 'user2@localhost',
        password: 'password2'
    }
];

function getUser(username) {
    return mockUsers.find((user) => user.username == username);
}

module.exports = {
    getUser: (username) => {
        return new Promise((fulfill, reject) => {
            if (username) {
                const user = getUser(username);
                if (user) {
                    fulfill(user);
                } else {
                    reject({error: 'User does not exist'});
                }
            } else {
                reject({error: 'User does not exist'});
            }
        });
    }
};
