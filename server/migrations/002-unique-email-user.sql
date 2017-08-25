-- Up
CREATE UNIQUE INDEX ux_user_email ON user(email);

-- Down
DROP INDEX ux_user_email;
