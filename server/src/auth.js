const passport = require('passport');
const jwt = require('passport-jwt');
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const webtoken = require('jsonwebtoken');

const secret = 'secret';

function extractToken(req) {
    var token = req.headers.authorization;
    console.log('Provided token: ' + token);
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
        var opts = {subject: username, test: true, refresh: false};
        if (extras && extras.refresh) {
            opts.refresh = true;
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
