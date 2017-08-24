-- Up
CREATE TABLE task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
    done INTEGER NOT NULL);
INSERT INTO task (name, done) VALUES ('Test task SQL 1', 0);
INSERT INTO task (name, done) VALUES ('Test task SQL 2', 0);

-- Down
DROP TABLE task;
