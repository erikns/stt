-- Up
CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
    done INTEGER NOT NULL);
INSERT INTO task (name, done) VALUES ('Easy task', 1);
INSERT INTO task (name, done) VALUES ('Medium task', 0);
INSERT INTO task (name, done) VALUES ('Hard task', 0);

CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL);
INSERT INTO user (email, password) VALUES ('user1@localhost',
    '$2a$06$sZGNS/9s6P9ruGx8XudmTeWsMtbKNPer2UTYh8hK6GKw8cwtV3Rl6'); -- password1
INSERT INTO user (email, password) VALUES ('user2@localhost',
    '$2a$06$bJ1z5n3v.xdB1A7QcfDLEundNhmLB4OOga.3ZjKeimaKDKLyHPTZ6'); -- password2

-- Down
DROP TABLE task;
