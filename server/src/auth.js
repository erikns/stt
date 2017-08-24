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
            done(null, {username: token.subject});
        });
    },

    token: (username) => {
        return webtoken.sign({subject: username, test: true}, secret);
    },

    verify: (token) => {
        return webtoken.verify(token, secret);
    },

    decodeToken: (token) => {
        return webtoken.decode(token, {complete: true}).payload;
    }
};
