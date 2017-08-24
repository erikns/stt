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
            if (token.subject == 'goodUser') {
                done(null, {username: 'goodUser'});
            } else {
                done(null, false);
            }
        });
    },

    token: (username) => {
        return webtoken.sign({subject: username, test: true}, secret);
    }
};
