-- Up
CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
    done INTEGER NOT NULL);
INSERT INTO task (name, done) VALUES ('Test task SQL 1', 0);
INSERT INTO task (name, done) VALUES ('Test task SQL 2', 0);

CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL);
INSERT INTO user (email, password) VALUES ('user1@localhost', 'password1');
INSERT INTO user (email, password) VALUES ('user2@localhost', 'password2');

-- Down
DROP TABLE task;
