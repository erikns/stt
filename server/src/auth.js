const passport = require('passport');
const jwt = require('passport-jwt');
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const webtoken = require('jsonwebtoken');

const secret = 'secret'; // TODO: make configurable

function extractToken(req) {
    var token = req.headers.authorization;
    return token;
}

const opts = {};
opts.jwtFromRequest = extractToken;
opts.secretOrKey = secret;

module.exports = {
    configure: () => {
        return new JWTStrategy(opts, (token, done) => {
            if (token.refresh === false) {
                done(null, {username: token.subject});
            } else {
                done(null, false); // do not accept refresh tokens for normal auth
            }
        });
    },

    token: (username, extras) => {
        var opts = {subject: username, test: true, refresh: false,
            expiresIn: 3600}; // TODO: make expiration time configurable?
        if (extras && extras.refresh) {
            opts.refresh = true;
            opts.expiresIn = 36000; // TODO: make refresh expiration time configurable?
        }
        return webtoken.sign(opts, secret);
    },

    verify: (token) => {
        return webtoken.verify(token, secret);
    },

    decodeToken: (token) => {
        return webtoken.decode(token, {complete: true}).payload;
    }
};
